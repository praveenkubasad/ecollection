'use strict';

const Accounts = require("../../models/accounts");
const updateById = async (_id,toPatch={})=>{
    const query ={}

    if(_id){
        query={
            _id
        }
    }
   
    const accpount= await Accounts.findOneAndUpdate(query,toPatch,{new:true, useFindAndModify:false})
    return accpount ? accpount.toObject() : accpount
}

module.exports = updateById