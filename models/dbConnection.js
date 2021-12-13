const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL 

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error,result) =>{
     if(error){
        console.log(error); 
        process.exit();
     }
     console.log("DB connected successfully!")
});


module.exports = mongoose;
