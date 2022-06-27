import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from "../../App"

const ResetPassword =()=>{
    const [email,setEmail]=useState("")
    const history=useHistory()


    const resetPassword=()=>{
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
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
                    <h2 className="header" >Reset Password</h2>

                    <div>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your Email"></input>
                    </div>

                    <button className="btn blue darken-4 center" onClick={()=>resetPassword()}>Reset Password</button>
                    <br />
                    <Link className="center "to="/login">Login</Link>
            </div>
        </div>
    )
}


export default ResetPassword