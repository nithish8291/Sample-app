const express = require("express");
const transactionRoute = express.Router();
const transactionController = require("../controller/transactionController.js");
const ensureLogin = require("./auth.js");


transactionRoute.post("",ensureLogin, transactionController.createTransaction);

transactionRoute.get("",ensureLogin, transactionController.getTransaction);

module.exports  = transactionRoute;