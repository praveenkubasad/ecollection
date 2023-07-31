const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const AuthMiddlewares = require("../middlewares/auth");
const AccountsControllers = require("../controllers/account");
const Validators = require("../utils/validators");

router.post("/register",
//Validators.registerAccountsValidation,
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
AuthMiddlewares.validateAccountFields,
async(req,res)=>{
  try{
      await AccountsControllers.accountCreationByAgent(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

router.put("/register",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
AuthMiddlewares.validateAccountFields,
async(req,res)=>{
  try{
      await AccountsControllers.accountEditByAgent(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

router.get("/register",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await AccountsControllers.getAccountList(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

router.get("/register/:Id",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await AccountsControllers.getAccountById(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

router.delete("/register/:Id",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await AccountsControllers.deleteAccountById(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)


module.exports = router;