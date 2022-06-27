import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from "../../App"

const Login =()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const history=useHistory()
    const {state,dispatch} = useContext(UserContext)

    const login=()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                console.log(data.message)
                M.toast({html:"Login Succesful",className:""})
                localStorage.setItem('token',data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                history.push("/home")
                dispatch({type:"USER",payload:data.user})
            }
        })
    }


    return(
        <div>
            <div className="card auth-card input-field">
                    <h2 className="header" >Log in</h2>

                    <div>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your Email"></input>
                    </div>
                    
                    <div>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password"></input>
                    </div>

                    <button className="btn blue darken-4 center" onClick={()=>login()}>Login</button>
                    <br />
                    <Link className="center "to="/resetPassword">Reset Password?</Link>
            </div>
        </div>
    )
}


export default Login