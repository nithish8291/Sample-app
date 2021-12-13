const userService = require("../services/userService.js");
const ErrorHandler = require("../errorHandler.js");
const handleAsync = require("../handleAsync.js");
const generateApiKey = require('generate-api-key');
const CryptoJS = require("crypto-js");


module.exports.createUser = handleAsync(async (req,res,next) =>{

    let result = await userService.create(req.body);
    if(!result){
        throw new ErrorHandler("Failed, data insert",500)
    }
    res.status(200).send({
        message: "User created successfully"
    })

})

module.exports.loginUser = handleAsync(async (req,res,next) =>{
    const ses =  req.session;
    const algorithm = 'aes-256-cbc';
    const result = await userService.login(req.body);
    if(!result){
        throw new ErrorHandler("Failed, login",500)
    }
    if(!process.env.LOGIN_KEY){
        throw new ErrorHandler("Login key is missing in the environment",500)
    }
    const api_key = generateApiKey(); 
    const ciphertext = CryptoJS.AES.encrypt(api_key, process.env.LOGIN_KEY).toString();
    req.session['api_key'] = api_key;
    req.session['user_id'] = result;
    req.session['ciphertext'] = ciphertext;
    res.status(200).send({
        message: "Logined successfully",
        accessKey: ciphertext
    })

})






