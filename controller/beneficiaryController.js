const beneficiaryService = require("../services/beneficiaryService.js");
const ErrorHandler = require("../errorHandler.js");
const handleAsync = require("../handleAsync.js");

module.exports ={

    createBeneficiary :  handleAsync(async (req,res,next) =>{

        if(req.get('Content-Type') != "application/json"){
            res.status(400).send({
                message: "Invalid content type."
            })
        }
        let obj =  req.body;
        let sess = req.session; 
        obj['user_id'] =  sess.user_id;
        let result = await beneficiaryService.create(obj);
        if(!result){
            throw new ErrorHandler("Failed, beneficiary insert",500)
        }
        res.status(200).send({
            message: "Beneficiary created successfully"
        })
  
    }),
    findBeneficiary : handleAsync(async (req,res,next) =>{
        let sess = req.session; 
        let result = await beneficiaryService.findAll(sess.user_id);
        if(!result){
            throw new ErrorHandler("Failed, beneficiary fetch",500)
        }
        res.status(200).send(result);
    }),
    updateBeneficiary : handleAsync(async (req,res,next) =>{
        if(req.get('Content-Type') != "application/json"){
            res.status(400).send({
                message: "Invalid content type."
            })
        }
        let sess = req.session; 
        let obj =  req.body;
        obj['modifiedDate'] = new Date();
        let result = await beneficiaryService.update(req.params.id,obj);
        if(!result){
            throw new ErrorHandler("Failed, beneficiary update",500)
        }
        res.status(200).send("Beneficiary updated successfully");
    }),
    removeBeneficiary : handleAsync(async (req,res,next) =>{ 
        let result = await beneficiaryService.delete(req.query.id);
        if(!result){
            throw new ErrorHandler("Failed, beneficiary removal",500)
        }
        res.status(200).send("Beneficiary removed successfully");
    })
}