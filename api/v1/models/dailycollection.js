const mongoose = require("mongoose");
const { DAILY_COLLECTION } = require("../utils/constants").collections;

const Schema = mongoose.Schema;

const dailyCollectionSchema = new Schema({

    _id:{
        type:String,
        default: mongoose.Types.ObjectId
    },
    agentId:String,
    accountId: String,
    accountHolderName:String,
    date: String,
    mode: String,
    amount: Number
}, {
    timestamps: true,
  }
)
module.exports = mongoose.model(DAILY_COLLECTION, dailyCollectionSchema);
