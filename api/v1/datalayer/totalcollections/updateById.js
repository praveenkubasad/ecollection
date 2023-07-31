'use strict';

const totalCollection = require("../../models/totalcollection");
const updateById = async ({_id,date,agentId,toPatch={}})=>{
    let query ={}

    if(_id){
        query._id=_id
    }
    if(date){
        query.date=date
    }
    if(agentId){
        query.agentId = agentId
    }
    const dc= await totalCollection.findOneAndUpdate(query,toPatch,{new:true, useFindAndModify:false})
    return dc ? dc.toObject() : dc
}

module.exports = updateById