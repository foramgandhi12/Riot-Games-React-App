import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory,useParams } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from "../../App"

const ResetPassword =()=>{
    const [password,setPassword]=useState("")
    const history=useHistory()
    const params =useParams()

    const resetPassword=()=>{
        fetch("/newPassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                newpassword:password,
                token:params.token
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                console.log(data.message)
                M.toast({html:data.message,className:""})
                history.push("/login")
            }
        })
    }


    return(
        <div>
            <div className="card auth-card input-field">
                    <h2 className="header" >Create New Password</h2>

                    <div>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password"></input>
                    </div>

                    <button className="btn blue darken-4 center" onClick={()=>resetPassword()}>Reset Password</button>
                    <br />
            </div>
        </div>
    )
}


export default ResetPassword