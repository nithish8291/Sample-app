const Beneficiary = require("../models/beneficiaryModel.js");

module.exports = {
    create : (obj) =>{
        return new Promise((resolve,reject) =>{
            let beneficiaryUser = new Beneficiary(obj);
            Beneficiary.create(beneficiaryUser, (err,res)=>{
                if(err){
                    err.statusCode = 500
                    reject(err)
                }
                resolve(res)
            })
        })
    },
    update : (id,obj) =>{
        return new Promise((resolve,reject) =>{
            Beneficiary.updateOne({_id: id},{$set: obj}, (err,res)=>{
                if(err){
                    err.statusCode = 500
                    reject(err)
                }
                resolve(res)
            })
        })
    },
    delete : (id) =>{
        return new Promise((resolve,reject) =>{
            Beneficiary.deleteOne({_id: id}, (err,res)=>{
                if(err){
                    err.statusCode = 500
                    reject(err)
                }
                resolve(res)
            })
        })
    },
    findAll : (user_id) =>{
        return new Promise((resolve,reject) =>{
            Beneficiary.find({user_id: user_id}, (err,res)=>{
                if(err){
                    err.statusCode = 500
                    reject(err)
                }
                resolve(res)
            })
        })
    }

}