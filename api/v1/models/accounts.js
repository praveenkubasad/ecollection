const { version } = require("chai");
const mongoose = require("mongoose");
const { ACCOUNT_COLLECTION } = require("../utils/constants").collections;

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    address: String,
    landMark: String,
    cityName: String,
    pinCode: String,
  
    location: {    
      type: {type: String, default: 'Point'},  
      coordinates: {type: [Number], default: [0, 0]}
  }
  },{_id:false, id:false, versionKey:false});

const accountSchema = new mongoose.Schema(
  {
    // accountId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //   //required: true,
    //   unique: true,
    // },
    
    // username: {
    //   type: String,
    //   unique: true,
    // },
    _id:{
        type:String,
        default: mongoose.Types.ObjectId
    },
    deleted:{
        type: Boolean,
        default:false
    },
    firstName: String,
    middleName: String,
    lastName: String,
    mobileNo: String,
    email: String,
    shopName: String,
    motherName : String,
    accousntNumber : String,
    currentBalance : Number,
    gender: String,
    age: Number,
    dateOfBirth:String,
    accountType:String,
    scheme:String,

    knownLanguages: {
      type: String,
    },
    profession: String,
    location: Object,
    latitude: Number,
    longitude: Number,
    photoUrl: String,
    symptoms: String,
    createdById: String,
    address: AddressSchema,
    status: {
        type: String,
        default: "active"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(ACCOUNT_COLLECTION, accountSchema);
