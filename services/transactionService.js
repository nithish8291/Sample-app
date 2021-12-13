const Transaction = require("../models/transactionModel.js");
const Beneficiary = require("../models/beneficiaryModel.js"); 

let getBeneficiary = (obj) => {
    return new Promise((resolve,reject)=>{
        Beneficiary.findOne({accountNumber: obj.accountNumber, ifsc_code: obj.ifsc_code},(err,res)=>{
            if(err || !res){
                resolve(false)
            }
            resolve(true)
        })
    })
}

module.exports = {
    create :  (obj) =>{
        return new Promise(async (resolve,reject) =>{
            let transactionObj = new Transaction(obj);
            const beneficiaryExist = await getBeneficiary(obj);
            if(!beneficiaryExist){
                let err = new Error("Beneficiary not found");
                err.statusCode = 500;
                reject(err)
            }
            Transaction.create(transactionObj, (err,res)=>{
                if(err){
                    err.statusCode = 500
                    reject(err)
                }
                resolve(res)
            })
        })
    },
    getAllTransaction : (id) =>{
        return new Promise((resolve,reject) =>{
            
            Transaction.find({userId: id}, (err,res)=>{
                if(err){
                    err.statusCode = 500
                    reject(err)
                }
                resolve(res)
            })
        })
    }
}