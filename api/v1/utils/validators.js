// validation
const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    role: Joi.string().valid('admin','agent').required(),
    email: Joi.string().min(3).max(256).required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(1).max(30).required()
  });

  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(256).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const emailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(256).required().email(),
  });

  return schema.validate(data);
};

const updatePasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(256).required().email(),
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const resetPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(256).required().email(),
    password: Joi.string().min(6).required(),
    otp: Joi.number().min(6).required(),
  });

  return schema.validate(data);
};

const registerAccountsValidation = (data) => {
  const schema = Joi.object({
    //role: Joi.string().valid('admin','agent').required(),
    email: Joi.string().min(3).max(256).required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(3).max(30).required(),
    middleName : Joi.string().valid('').min().max(30).optional(),
    lastName: Joi.string().min(1).max(30).required(),
    mobileNo: Joi.string().regex(/^([+]\d{2})?\d{10}$/).min(10).max(13).required(),
    shopName : Joi.string().min(3).max(30).required(),
    motherName : Joi.string().min(3).max(30).required(),
    accountNumber:Joi.string().regex(/^[a-zA-Z0-9]+$/).min(3).max(20).required(),
    currentBalance:Joi.number().min(3).max(9999999999).required(),
    gender:Joi.string().min(1).max(1).required(),
    age:Joi.number().min(2).max(99).required(),
    dateOfBirth:Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required(),
    accountType:Joi.string().min(2).max(6).required(),
    scheme:Joi.string().min(2).max(10).required(),
   // knownLanguages,
    latitude:Joi.number().valid('').optional(),
    longitude:Joi.number().valid('').optional(),
    photoUrl:Joi.string().valid('').min(2).max(100).optional(),
    profession:Joi.string().valid('').min(2).max(100).optional(),
    createdById:Joi.string().min(2).max(100).required(),
     address:Joi.object().keys({
        landMark:Joi.string().valid('').min(2).max(100).optional(),
       cityName:Joi.string().min(2).max(100).required(),
       pinCode:Joi.string().min(6).max(6).required()
     }) 
    
  });

  return schema.validate(data);
};

const dailycollectionValidation = (data) =>{
  const schema = Joi.object({
    accountHolderName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
    mode: Joi.string().valid("daily","weekly").required(),
    amount: Joi.number().integer().min(100).max(10000),
    accountId:Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
    agentId:Joi.string().regex(/^[a-zA-Z0-9]+$/).required()
  })
  return schema.validate(data)
}

module.exports.resetPasswordValidation = resetPasswordValidation;
module.exports.updatePasswordValidation = updatePasswordValidation;
module.exports.emailValidation = emailValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerAccountsValidation=registerAccountsValidation;
module.exports.dailycollectionValidation =dailycollectionValidation;