const dailycollection = require("../../models/dailycollection");

const create = async(userObj)=>{
    const dc = new dailycollection(userObj)
    await dc.save()
    return dc.toObject();

}

module.exports = create;