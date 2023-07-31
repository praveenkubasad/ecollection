const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const AuthMiddlewares = require("../middlewares/auth");
const AccountsControllers = require("../controllers/account");
const collectionControllers = require('../controllers/collection')

router.post("/daily",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateDailyCollectionFields,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await collectionControllers.saveDailyCollectionDetails(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

router.put("/daily",
AuthMiddlewares.checkAccessToken,
//AuthMiddlewares.validateDailyCollectionFields,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await collectionControllers.editDailyCollectionDetails(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)

router.get("/daily",
AuthMiddlewares.checkAccessToken,
AuthMiddlewares.validateAccessToken,
async(req,res)=>{
  try{
      await collectionControllers.getDailyCollectionDetails(req,res)
  }catch(error){
    internalServerError(res, error);
  }
}
)




module.exports = router;
