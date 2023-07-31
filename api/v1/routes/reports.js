const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const AuthMiddlewares = require("../middlewares/auth");
const AccountsControllers = require("../controllers/account");
const reportControllers = require('../controllers/reports')

router.get("/weekly",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await reportControllers.getWeeklyCollectionReports(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

router.get("/monthly",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await reportControllers.getMonthlyCollectionReports(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

module.exports = router