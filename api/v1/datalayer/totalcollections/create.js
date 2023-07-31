const totalCollection = require("../../models/totalcollection");

const create = async(userObj)=>{
    const dc = new totalCollection(userObj)
    await dc.save()
    return dc.toObject();

}

module.exports = create;