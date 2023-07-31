const mongoose = require("mongoose");
const { TOTAL_COLLECTION } = require("../utils/constants").collections;

const Schema = mongoose.Schema;

const totalCollectionSchema = new Schema({

    _id:{
        type:String,
        default: mongoose.Types.ObjectId
    },
    agentId:String,
  
    date: String,
  
    amount: Number
}, {
    timestamps: true,
  }
)
module.exports = mongoose.model(TOTAL_COLLECTION, totalCollectionSchema);
