const express = require("express");
const beneficiaryRoute = express.Router();
const beneficiaryController = require("../controller/beneficiaryController.js");
const ensureLogin = require("./auth.js");


beneficiaryRoute.post("",ensureLogin, beneficiaryController.createBeneficiary);

beneficiaryRoute.patch("/:id",ensureLogin, beneficiaryController.updateBeneficiary);

beneficiaryRoute.delete("",ensureLogin, beneficiaryController.removeBeneficiary);

beneficiaryRoute.get("",ensureLogin, beneficiaryController.findBeneficiary);


module.exports = beneficiaryRoute;


