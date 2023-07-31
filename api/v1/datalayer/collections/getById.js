'use strict';

const dailycollection = require("../../models/dailycollection");
const get = async ({id, mobileNo,email,createdById,date} = {})=>{
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
    const dc= await dailycollection.findOne(query)
    return dc ? dc.toObject() : dc
}

module.exports = get