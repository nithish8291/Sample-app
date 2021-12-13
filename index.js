const express = require('express');
const app = express();
const dotEnv = require("dotenv").config();
if(dotEnv.error){
    throw dotEnv.error;
}
const env_var_list = ['NODE_ENV','MONGO_URL','SECRET_KEY','LOGIN_KEY']; 
preFlyValidation();
const db = require('./models/dbConnection.js');
const ErrorHandler = require('./errorHandler.js');
const userRoute = require("./routes/userRoute.js");
const beneficiaryRoute =  require("./routes/beneficiaryRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");
const errorController = require('./errorController.js');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 450000 },
    resave: true
}));

app.use(cookieParser());


app.use((req,res,next) =>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

})

app.use("/",userRoute);
app.use("/beneficiary",beneficiaryRoute);
app.use("/transaction",transactionRoute);


app.use((req,res,next)=>{
    const error = new ErrorHandler('Not Found', 404); 
    next(error);

})

app.use(errorController); 

app.listen(port, ()=>{
    console.log(
        `Listening on port ${port}`
    );
})


function preFlyValidation(){
    for(let i in env_var_list){
        if(!process.env[env_var_list[i]]){
            throw new Error(`${env_var_list[i]} is not added in the environment`);
        }
    }
 };




