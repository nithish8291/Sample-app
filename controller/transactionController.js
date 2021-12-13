const transactionService = require("../services/transactionService.js");
const ErrorHandler = require("../errorHandler.js");
const handleAsync = require("../handleAsync.js");

module.exports ={

    createTransaction :  handleAsync(async (req,res,next) =>{

        if(req.get('Content-Type') != "application/json"){
            res.status(400).send({
                message: "Invalid content type."
            })
        }

        let obj =  req.body;
        let sess = req.session; 
        obj['user_id'] =  sess.user_id;

        let result = await transactionService.create(obj);
        if(!result){
            throw new ErrorHandler("Failed, transaction insert",500)
        }
        res.status(200).send({
            message: "Transaction successfully"
        })
  
    }),
    getTransaction :  handleAsync(async (req,res,next) =>{
        let sess = req.session; 
        let result = await transactionService.getAllTransaction(sess.user_id);
        if(!result){
            throw new ErrorHandler("Failed, transaction fetch",500)
        }
        res.status(200).send(result)
    })
}