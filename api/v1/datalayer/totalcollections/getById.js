'use strict';

const totalCollection = require("../../models/totalcollection");
const get = async ({id, mobileNo,email,createdById,date, agentId} = {})=>{
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
    if(date){
        query.date = date
    }
    if(agentId){
        query.agentId = agentId
    }
    const dc= await totalCollection.findOne(query)
    return dc ? dc.toObject() : dc
}

module.exports = get