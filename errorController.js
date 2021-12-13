let devError = (err,res) =>{
    const statusCode = err.statusCode || 500;
    res.status(err.statusCode).send({
        success: 0,
        message: err.message,
        stack: err.stack
    })
}

let prodError = (err,res) =>{
    const statusCode = err.statusCode || 500;
    res.status(err.statusCode).send({
        success: 0,
        message: err.message
    })
}

module.exports = (err,req,res,next)=>{
    if(process.env.NODE_ENV === "dev"){
        devError(err,res)
    }else{
        prodError(err,res)
    }
}