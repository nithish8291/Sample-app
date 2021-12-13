const CryptoJS = require("crypto-js");


function ensureLogin (req,res,next){
    let sess = req.session;
    if(sess && !sess.user_id){
        res.status(401).send("Not authenticated");
        return;
    }
    let auth_data = req.header("authorization");
    if(!auth_data){
        res.status(401).send("Not authorized");
        return;
    }
    let bytes  = CryptoJS.AES.decrypt(auth_data, process.env.LOGIN_KEY);
    let originalText = bytes.toString(CryptoJS.enc.Utf8); 
    if(sess && (req.session.api_key && req.session.api_key != originalText) || !req.session.api_key){
        res.status(401).send("Not authorized");
        return;
    }else{
        next()
    }
    
}


module.exports = ensureLogin;