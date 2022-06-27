import React, { useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'


const Signup =()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [firstName,setFName]=useState("")
    const [lastName,setLName]=useState("")
    const [program,setProgram]=useState("")
    const history=useHistory()

    const signup=()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                program
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                console.log(data.message)
                M.toast({html:"Signed up Succesful",className:""})
                history.push("/login")
            }
        })
    }


    return(
        <div>
            <div className="card auth-card input-field">
                    <h2 className="header" >Sign up</h2>

                    <div>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your Email"></input>
                    </div>
                    
                    <div>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password"></input>
                    </div>
                    
                    <div>
                        <input type="text" value={firstName} onChange={(e)=>{setFName(e.target.value)}} placeholder="Enter your first name"></input>
                    </div>

                    <div>
                        <input type="text" value={lastName} onChange={(e)=>{setLName(e.target.value)}} placeholder="Enter your last name"></input>
                    </div>

                    <div>
                        <input type="text" value={program} onChange={(e)=>{setProgram(e.target.value)}} placeholder="Enter your program"></input>
                    </div>
                    <button className="btn navBtn blue darken-4" onClick={()=>signup()}>Sign up</button>
            </div>
        </div>
    )
}


export default Signup