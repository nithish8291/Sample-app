const express = require("express");
const userRoute = express.Router();
const userController = require("../controller/userController.js");
const generateApiKey = require('generate-api-key');
const CryptoJS = require("crypto-js");


userRoute.post("/signup", userController.createUser)


userRoute.post("/login",authenticate,userController.loginUser)


function authenticate(req,res,next){
  
  if(req.session.api_key && req.session.user_id){
    res.status(200).send({
      message: "Logined successfully",
      accessKey: req.session.ciphertext
    })
  }else{
    next()
  }
  
}



module.exports = userRoute;