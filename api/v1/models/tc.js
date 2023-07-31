const mongoose = require("mongoose");
const { TOTAL_COLLECTION_NEW } = require("../utils/constants").collections;

const Schema = mongoose.Schema;

const totalCollectionSchema = new Schema({
    _id:{
        type: String,
        default: mongoose.Types.ObjectId
    },
    totalAmount:Number,
    agentId:String,
    date:String,
},{timestamps:true})


module.exports = mongoose.model("TotalCollection", totalCollectionSchema);
