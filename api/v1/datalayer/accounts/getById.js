'use strict';

const Accounts = require("../../models/accounts");
const get = async ({filter: {id, mobileNo,email,createdById,date} ={}} = {})=>{
    const query ={}

    if(id){
        query._id=id
    }
    if(mobileNo){
        query.mobileNo=mobileNo
    }
    if(email){
        query.email= email
    }
     if(createdById){
        query.createdById= createdById
    }
    const account= await Accounts.findOne(query)
    return account ? account.toObject() : account
}

module.exports = get