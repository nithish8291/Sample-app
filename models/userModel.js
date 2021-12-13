const mongoose = require('./dbConnection.js');
const crypto = require('crypto');

let UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate: function(value){
            return String(value).toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
        }
    },
    mobileNumber:{
        type: Number,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique:true
    },
    createdDate:{
       type: Date,
       default: new Date()
    },
    hash : {
       type: String
    }, 
    salt : {
        type: String
    } 
})

UserSchema.methods.setPassword = function(password) { 
       this.salt = crypto.randomBytes(16).toString('hex'); 
       this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
}; 
  
UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};   



let User = module.exports =  mongoose.model('user',UserSchema);

