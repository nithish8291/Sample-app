const mongoose = require("./dbConnection.js");
const encrypt = require('mongoose-encryption');

let TransactionSchema = mongoose.Schema({
    accountName:{
        type: String,
        require: true
    },
    accountNumber:{
        type: Number,
        require: true
    },
    ifsc_code:{
        type: String,
        require: true
    },
    amount:{
        type: Number,
        require: true
    },
    remarks:{
        type: String,
        require: true
    },
    createdDate:{
        type: Date,
        default: new Date()
    },
    modifiedDate:{
        type: String,
        default: new Date()
    },
    user_id: {
        type: String
    }
})


TransactionSchema.plugin(encrypt, { secret: process.env.SECRET_KEY,decryptPostSave: false, excludeFromEncryption: ['createdDate','modifiedDate'] });

const Transaction = module.exports = mongoose.model("transaction",TransactionSchema);

