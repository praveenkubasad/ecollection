'use strict';

const dailycollection = require("../../models/dailycollection");
const updateById = async (_id,toPatch={})=>{
    let query ={}

    if(_id){
      query._id=_id
    }
    // if(date){
    //     query.date=date
    // }
   
    const dc= await dailycollection.findOneAndUpdate(query,toPatch,{new:true, useFindAndModify:false})
    return dc ? dc.toObject() : dc
}

module.exports = updateById