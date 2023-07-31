'use strict';

const Agent = require("../../models/user")
const updateById = async (_id,toPatch={})=>{
    const query ={}

    if(_id){
        query={
            _id
        }
    }
   
    const agent= await Agent.findOneAndUpdate(query,toPatch,{new:true, useFindAndModify:false})
    return agent ? agent.toObject() : agent
}

module.exports = updateById