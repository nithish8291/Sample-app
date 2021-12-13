const User = require("../models/userModel.js");

module.exports ={

    create : (obj) => {
        return new Promise((resolve,reject) =>{
            let newUser = new User(obj);
            newUser.setPassword(obj.password);
            User.create(newUser, (error,result) =>{
                if(error){
                    error.statusCode = 500
                    reject(error)
                }
                resolve(result);
            })
        })
    },

    login:  (obj) =>{
        return new Promise((resolve,reject) =>{
        
            User.findOne({ userName : obj.userName }, function(err, user) { 
                if (user === null) { 
                    let error = new Error("User not found");
                    error.statusCode = 400
                    reject(error)
                } 
                else { 
                    if (user.validPassword(obj.password)) { 
                        resolve(user._id)
                    } 
                    else { 
                        let error = new Error("Wrong passowrd");
                        error.statusCode = 400
                        reject(error)
                    } 
                } 
            }); 
        })    
    }
}