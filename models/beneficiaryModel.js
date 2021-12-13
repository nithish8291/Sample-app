const mongoose = require("./dbConnection.js");

let BeneficiarySchema = mongoose.Schema({
    accountName:{
        type : String,
        require: true
    },
    accountNumber:{
        type: Number,
        require: true
    },
    ifsc_code: {
        type: String,
        require: true
    },
    user_id: {
        type: String
    },
    createdDate:{
        type: Date,
        default: new Date()
    },
    modifiedDate:{
        type: Date,
        default: new Date()
    },
})


BeneficiarySchema.index({accountNumber:1,ifsc_code:1,user_id:1},{unique: true})

let Beneficiary =  module.exports = mongoose.model('beneficiary', BeneficiarySchema);