const mongoose=require('mongoose')

const {ObjectId}=mongoose.Schema.Types

const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    program:{
        type:String
    },
    resetToken:String,
    expiration:Date

})

mongoose.model("USER",userSchema)