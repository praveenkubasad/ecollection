const auth = require("../models/auth");
const User = require("../models/user");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").successMessages;
const {accounts,agents} = require("../datalayer");
const Dailycollection = require("../models/dailycollection");
const TotalCollection = require("../models/tc");
const getAgetnById = require("../datalayer/agents/getById")
const moment = require('moment')
const AccountContants = require("../utils/constants").account;
const connectToDB = require("../../../core/db").connectToDB;
const getDailyCollectionById = require("../datalayer/collections/getById")
const updateDailyCollectionById = require("../datalayer/collections/updateById")
const updateTotalCollectionById = require('../datalayer/totalcollections/updateById')
const getTotalCollectionById = require("../datalayer/totalcollections/getById")
const {
    internalServerError,
    errorMessage,
    successMessage
} = require("../utils/response");
const {
    patch
} = require("../routes/auth");

module.exports.saveDailyCollectionDetails = async (req, res) => {
    // check if user exists
    let session; // = await Dailycollection.startSession();
    try {
        session = await Dailycollection.startSession()
        session.startTransaction();

        const data = req.tokenData
        let getAgetnData = await getAgetnById({ id: data.authId});
        if (getAgetnData && getAgetnData.status ===  AccountContants.accountStatus.active) {
            let userData = await accounts.getById({_id:req.body.accountHolderId})
            if (userData && userData.status === AccountContants.accountStatus.active) {
                //userData = (userData.length) ? userData : [userData]
                const isValid = true // userData.find((e) => e._id == req.body.accountId)
                if (isValid) {
                    const opts = { session };
                    const account = new Dailycollection({
                        agentId: data.authId,
                        accountHolderId: req.body.accountHolderId,
                        accountHolderName: req.body.accountHolderName,
                        date: moment().format("DD/MM/YYYY"),
                        mode: req.body.mode,
                        amount: req.body.amount,
                        accountId: req.body.accountId,
                    })
                    await account.save(opts,async (error, success) => {
                        if (success) {
                            const totalCollecctionResults = await TotalCollection.findOne({
                                agentId: data.authId,
                                date: moment().format("DD/MM/YYYY")
                            })
                            if (totalCollecctionResults) {
                                const patch = {}
                                patch.totalAmount = totalCollecctionResults.totalAmount + req.body.amount
                                patch.agentId = data.authId
                                const result = await TotalCollection.findOneAndUpdate({
                                    _id: totalCollecctionResults._id
                                }, patch,opts);
                                console.log('total result --' + JSON.stringify(result))
                            } else {
                                const totalCol = new TotalCollection({
                                    totalAmount: req.body.amount,
                                    agentId: data.authId,
                                    date: moment().format('DD/MM/YYYY')
                                })
                                const totalCollectionRes = await totalCol.save(opts);
                                 if (totalCollectionRes) {
                                  console.log('TotalCollection created successfully:', totalCollectionRes);
                                  } else {
                                     console.log('Failed to create TotalCollection.');
                                }
                                console.log('totalColelctionResult----' + JSON.stringify(totalCollectionRes))
                            }
                            await session.commitTransaction();
                            session.endSession();
                            successMessage(res, 201, Success.DAILY_DATA_ENTERED)
                        } else {
                            console.log('error while saving daily data--' + JSON.stringify(error) + '-authId--' + data.authId)
                            errorMessage(res, 403, Errors.REGISTER_FAILED)
                        }
                    })
                } else {
                    session.endSession();
                    errorMessage(res, 400, Errors.Not_AUTHORIZED_ERROR)
                }
            } else {
                session.endSession();
                errorMessage(res, 400, Errors.Not_AUTHORIZED_ERROR)
            }
        } else {
            session.endSession();
            errorMessage(res, 400, Errors.Not_AUTHORIZED_ERROR)
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        internalServerError(res, error);
    }
};

module.exports.getDailyCollectionDetails = async (req, res) => {
    try {
        const data = req.tokenData
        const dailyCollectionRes = await Dailycollection.find({
            agentId: data.authId,
            date: moment().format("DD/MM/YYYY")
        })
        const totalCollectionRes = await TotalCollection.findOne({
            agentId: data.authId,
            date: moment().format("DD/MM/YYYY")
        })
        let totalAmount = 0
        let details = []
        if (dailyCollectionRes) {
            dailyCollectionRes.forEach(element => {
                let obj = {}
                totalAmount += element.amount
                obj.accountHolderName = element.accountHolderName
                obj.date = element.date
                obj.amount = element.amount
                obj._id = element._id
                details.push(obj)
            });
        }
        if (totalCollectionRes) {
            if (totalAmount == totalCollectionRes.totalAmount) {
                let resobj = {
                    totalAmount,
                    details
                }
                return res.status(200).json({
                    status: Success.SUCCESS,
                    resobj,
                });
            }
        }


    } catch (error) {
        internalServerError(res, error);
    }
};

module.exports.editDailyCollectionDetails  = async (req,res)=>{
    try {
        const data = req.tokenData
        const getCollectionData = await getDailyCollectionById({id:req.body._id})
        
        if(getCollectionData && (getCollectionData.amount != req.body.amount)){
            if(getCollectionData.agentId == data.authId){
                const  date =moment().format("DD/MM/YYYY")
                //const getDailyCollectionResult = await getDailyCollectionById({id})
                const updatedResult = await updateDailyCollectionById(getCollectionData._id,req.body)
                const totalCollectionRes = await getTotalCollectionById({agentId:data.authId,date})
                let totalAmount;
                let dbTotalAmount = totalCollectionRes.totalAmount;
                totalAmount= dbTotalAmount - getCollectionData.amount;
                totalAmount+=req.body.amount
                // let isGreater = (req.body.amount > getCollectionData.amount )?true : false
                // if(isGreater ){
                //     totalAmount =totalCollectionRes.totalAmount + (req.body.amount - getCollectionData.amount)
                // }else{
                //     totalAmount =totalCollectionRes.totalAmount - (req.body.amount)
                // }
                //const 
                let toPatch={}
                toPatch.totalAmount=totalAmount
                //const result = await TotalCollection.findOneAndUpdate({
                //     _id: totalCollecctionResults._id
                // }, patch,opts);
                const totalCollecctionResult = await TotalCollection.findOneAndUpdate({agentId:data.authId,date:date}, {$set:{totalAmount:totalAmount}})
                //const totalColelctionResult = await updateTotalCollectionById({agentId:data.authId,date:date,toPatch})
                return res.status(200).json({
                    status: Success.SUCCESS,
                    message: Success.ACCOUNT_UPDATED
                });
            }else{
                return res.status(400).json({
                    status: Errors.FAILED,
                    message: Errors.ACCOUNT_DOES_NOT_EXIST
                });
            }
        }else{

        }

    }catch(error){
        internalServerError(res, error);

    }
}