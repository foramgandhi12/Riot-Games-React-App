const express = require('express')
const router =express.Router()
const mongoose =require('mongoose')
const User = mongoose.model("USER")

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const sgMail = require("@sendgrid/mail")
const {jwtsecret}= require('../config/key')

sgMail.setApiKey(require("../config/key.js").api_key)


const resetPassword =(email,token)=>{
        return(
            {
                to:email,
                from:require("../config/key").sender,
                cc:"",
                subject:"Reset Password",
                html:`<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <a href="${require("../config/key").siteLink}resetPassword/${token}"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table> `
            }
        )
}
router.post('/signup',(req,res)=>{
    const {firstName,lastName,email,password,program}=req.body

    if(!firstName||!lastName||!email||!password){
        return res.status(422).json({error:"please fill out all fields"})
    }


    User.findOne({email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"There is a user with this email already"})
        }

        bcrypt.hash(password,12).then(hashedPassword=>{
            const user=new User({
                email,
                password:hashedPassword,
                firstName,
                lastName,
                program
            })

            user.save().then(user=>{
                res.json({message:"Signed up successfully"})
            }).catch(err=>{
                console.log(err)
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})


router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(422).json({error:"please fill out all fields"})
    }
    User.findOne({email}).then((savedUser)=>{
        if(!savedUser)return res.status(422).json({error:"User does not exist"})

        bcrypt.compare(password,savedUser.password).then(domatch=>{
            if(domatch){
                const token = jwt.sign({_id:savedUser._id},jwtsecret)
                const {_id,email,program,firstName,lastName}=savedUser
                res.json({token,user:{_id,email,program,firstName,lastName}})
            }
            else{
                return res.status(422).json({error:"Passwords do not match"})
            }
        })
    })

})




router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
            res.status(422).json({error:"Ran into unexpected problem"})
        }
        const token=buffer.toString("hex")
        User.findOne({email:req.body.email}).then(user=>{
            if(user){
                    user.resetToken = token
                    user.expiration=Date.now()+3600000000
                    console.log(req.body.email)
                    sgMail.send(resetPassword(user.email,user.resetToken)).then(()=>{
                        user.save().then(()=>{
                            res.json({"message":"Email was sent"})
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }).catch(err=>{
                        console.log(err.response.body)
                        res.status(422).json({error:"Ran into unexpected problem"})
                    })
            }
            else{
                res.status(422).json({error:"Email does not exist"})
            }
        })
    })
})


router.post('/newPassword',(req,res)=>{
    const {newpassword,token}=req.body

    User.findOne({resetToken:token,expiration:{$gt:Date.now()}}).then(user=>{
        if(user){
            bcrypt.hash(newpassword,12).then(hashedPassword=>{
                user.password=hashedPassword
                user.resetToken=undefined
                user.expiration=undefined

                user.save().then(savedUser=>{
                    res.json({"message":"Password was reseted successfully"})
                }).catch((err)=>{
                    console.log(err)
                    res.status(422).json({error:"Password was not reset"})
                })
            })
        }
        else{
            res.status(422).json({error:"Password was not reset"})
        }
    }).catch(err=>{
        res.status(422).json({error:"Password was not reset"})
    })
})
module.exports = router