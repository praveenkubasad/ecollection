'use strict';

const Agent = require("../../models/user")


const get = async ({filter: {id, mobileNo,email,date} ={}} = {})=>{
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
    const agent= await Agent.findOne(query)
    return agent ? agent.toObject() : agent
}

module.exports = get