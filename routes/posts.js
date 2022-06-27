const express = require('express')
const router =express.Router()
const mongoose =require('mongoose')
const User = mongoose.model("USER")
const Posts = mongoose.model("POSTS")
const requireLogin = require('../middleware/requireLogin')



router.post("/createPost",requireLogin,(req,res)=>{
    const {projectName,description,duration,difficulty}=req.body
    const {_id}=req.user
    const post = new Posts({projectName,description,duration,difficulty,postOwner:_id})
    post.save().then((savedPost)=>{
        res.json({_id:savedPost._id})
    }).catch(err=>{
        console.log(err)
        res.status(422).json({"error":"Did not create post"})
    })
})

router.get("/getPost/:id",requireLogin,(req,res)=>{
    const {id} = req.params
    console.log(id)
    Posts.findById(id).populate("postOwner","firstName lastName").then(savedPost=>{
        console.log(savedPost)
        if(savedPost)res.json({savedPost})
        else res.status(422).json({error:"Post does not exist"})
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})
router.put("/updatePost",requireLogin,(req,res)=>{
    const {projectName,description,duration,difficulty,id}=req.body
    const {_id}=req.user
    Posts.findById(id).then(savedPost=>{
        if(savedPost.postOwner.equals(_id)){
            savedPost.projectName=projectName
            savedPost.description=description
            savedPost.duration=duration
            savedPost.difficulty=difficulty
            savedPost.save().then(post=>{
                res.json({id:post._id})
            }).catch(err=>{
                console.log(err)
                res.status(422).json({error:"Could not update post"})
            })
        }
        else{
            res.status(422).json({error:"You do not have authorization to update"})
        }
        
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})

router.delete("/deletePost/:id",requireLogin,(req,res)=>{
    const {id}=req.params
    const {_id}=req.user
    Posts.findById(id).then(savedPost=>{
        if(savedPost){
            if(savedPost.postOwner.equals(_id)){
                Posts.findOneAndDelete(id).then(()=>{
                    res.json({message:"Deleted Successfully"})
                }).catch(err=>{
                    console.log(err)
                    res.status(422).json({error:"Could not delete"})
                })
            }
            else{
                res.status(422).json({error:"You do not have authorization to delete"})
            }
        }
        
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})


router.get("/getUserPosts",requireLogin,(req,res)=>{
    const {_id}=req.user

    Posts.find({postOwner:_id}).then((posts)=>{
        if(posts)res.json({posts})
        else  res.status(422).json({error:"There was a unexpected problem"})
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})


router.get("/getUserPosts/:id",requireLogin,(req,res)=>{
    const {id}=req.params

    Posts.find({postOwner:id}).then((posts)=>{
        
        if(posts){
            res.json({posts})
            console.log(posts)
        }
        else  res.status(422).json({error:"There was a unexpected problem"})
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})



router.get("/getUserData/:id",requireLogin,(req,res)=>{
    const {id}=req.params

    User.findById(id).select("firstName lastName program").then((savedUser)=>{
      
        if(savedUser)res.json({savedUser})
        else  res.status(422).json({error:"There was a unexpected problem"})
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})


router.get("/getLastThreePosts",(req,res)=>{
    Posts.find().sort("-dateCreated").limit(3).populate("postOwner","firstName lastName").then((savedPosts)=>{
        console.log(savedPosts)
        if(savedPosts)res.json({savedPosts})
        else  res.status(422).json({error:"There was a unexpected problem"})
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})

router.post("/searchPosts",(req,res)=>{
    console.log(req.body.query)
    const {query} = req.body
    let reg= new RegExp("^"+query.toLowerCase(),"i")
    Posts.find({projectName:{$regex:reg}}).sort('-dateCreated').populate("postOwner","firstName lastName").then((savedPosts)=>{
        console.log(savedPosts)
        if(savedPosts)res.json({savedPosts})
        else  res.status(422).json({error:"There was a unexpected problem"})
    }).catch(err=>{
        console.log(err)
        res.status(422).json({error:"There was a unexpected problem"})
    })
})
module.exports=router