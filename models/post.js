const mongoose=require('mongoose')

const {ObjectId}=mongoose.Schema.Types

const postSchema=new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    postOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

mongoose.model("POSTS",postSchema)