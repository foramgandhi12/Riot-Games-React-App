const jwt = require("jsonwebtoken")
const {jwtsecret}=require("../config/key")
const mongoose =require('mongoose')
const User = mongoose.model("USER")



module.exports=(req,res,next)=>{
    const {authorization}=req.headers;


    if(!authorization){
        res.status(401).json({error:"You must be logged in",errcode:"nl"})
    }

    const token = authorization.replace("Bearer ","")


    jwt.verify(token,jwtsecret,(err,payload)=>{
        if(err)res.status(401).json({error:"You must be logged in"})

        const {_id}=payload
        User.findById(_id).then(userData=>{
            req.user=userData
            next()
        })
    })
}