const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const JWTHandler = require("../../../core/jwt");
const TokenControllers = require("./token");
const Headers = require("../utils/constants").headers;
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").successMessages;
const UserControllers = require("../controllers/user");
const {
    default: Axios
} = require("axios");
const Helpers = require("../../../core/helpers");
const AccountConstants = require("../utils/constants").account;
const User = require("../models/user");
const Accounts = require("../models/accounts");
const { account } = require("../utils/constants");
module.exports.accountCreate = async (req, res) => {
    try{  
    const data = req.tokenData
    console.log('data==' + JSON.stringify(data))
    const userData = await User.findOne({
        userId: req.body?.email
    })
    if (!userData) {
        return res.status(403).json({
            status: Errors.FAILED,
            message: Errors.USER_NOT_EXISTS,
        });
    }
    if (data.role == "admin") {
        const authData = await auth.findOne({
            email: req.body.email
        })
        await auth.updateOne({
            email: req.body.email
        }, {
            $set: {
                status: 'approved'
            }
        })
        return res.status(200).json({
            status: Success.SUCCESS,
            message: Success.ACC_VERIFIED
        })
    }

    return res.status(200).json({})
}catch(err){
    console.log('-error in account creation---' + JSON.stringify(err))
    return res.status(403).json({
        status: Errors.FAILED,
        message: Errors.INTERNAL_SERVER_ERROR,
    });
}
}

module.exports.accountCreationByAgent = async (req, res) => {
    const data = req.tokenData
    if (data.role == AccountConstants.accRoles.admin || data.role == AccountConstants.accRoles.agent) {
        const userData = await Accounts.findOne({
            mobileNo: req.body?.mobileNo
        })
        if (!userData) {
            const account = new Accounts(req.body)
           account.createdById = data.authId
            await account.save(async (error, savedUser) => {
                if (savedUser)
                    return res.status(200).json({
                        status: Success.SUCCESS,
                        message: Success.ACCOUNT_CREATED,
                    });
                console.log(error);
                return res.status(403).json({
                    status: Errors.FAILED,
                    message: Errors.FAILED,
                });
            })
        } else {
            return res.status(403).json({
                status: Errors.FAILED,
                message: Errors.USER_EXISTS,
            });
        }
    }

}

module.exports.accountEditByAgent= async(req,res)=>{
    const data = req.tokenData
    if (data.role == AccountConstants.accRoles.admin || data.role == AccountConstants.accRoles.agent) {

        let userData = await Accounts.findOne({
            mobileNo: req.body?.mobileNo
        })
        if (userData) {
            userData = _updateUserModel(userData, req.body);
           // const account = new Accounts(req.body)
           userData.createdById = data.authId
            await userData.save(async (error, savedUser) => {
                if (savedUser)
                    return res.status(200).json({
                        status: Success.SUCCESS,
                        message: Success.ACCOUNT_UPDATED,
                    });
                console.log(error);
                return res.status(403).json({
                    status: Errors.FAILED,
                    message: Errors.FAILED,
                });
            })
        } else {
            return res.status(400).json({
                status: Errors.FAILED,
                message: Errors.ACCOUNT_DOES_NOT_EXIST,
            });
        }
    }
}

module.exports.getAccountList = async(req,res)=>{
    let userData = await Accounts.find({deleted:false})
    return res.status(200).json(userData);
}

module.exports.getAccountById = async (req,res)=>{
    let userData = await Accounts.find({_id:req.params.Id})
    if(userData){
        return res.status(200).json(userData[0]);
    }else{
        return res.status(400).json({
            status: Errors.FACEBOOK_LOGIN_FAILED,
            message: Errors.ACCOUNT_DOES_NOT_EXIST,
        });
    }
}

module.exports.deleteAccountById=async (req,res)=>{
    let userData = await Accounts.find({_id:req.params.Id})
    if(userData && userData?.deleted ==false){
        const result = await Accounts.updateOne({_id:req.params.Id},{$set:{deleted:true}});
        if(result){
            return res.status(200).json({
                status: Success.SUCCESS,
                message: Success.ACC_DELETED,
            });
        }
    }else{
        return res.status(400).json({
            status: Errors.FAILED,
            message: Errors.ACCOUNT_DOES_NOT_EXIST,
        });
    }
}


const _immutableFields = [
    "mobileNo",
    "createdById",
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
  ];
  
  function _isAllowed(key) {
    return !_immutableFields.includes(key);
  }
function _updateUserModel(userData, updated) {
    for (const [key, value] of Object.entries(updated)) {
      if (value && _isAllowed(key)) {
        userData[key] = updated[key];
      }
    }
  
    return userData;
  }