import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

import errorHandler from '../../utils/errorHandler'


const CreatePost =()=>{
    const [projectName,setProjectName]=useState("")
    const [description,setDescription]=useState("")
    const [duration,setDuration]=useState("")
    const [difficulty,setDifficulty]=useState("")
    const history=useHistory()

    const createPost =()=>{
        if(projectName==="")return M.toast({html:"Project Name is empty",className:""})
        if(description==="")return  M.toast({html:"Description is empty",className:""})
        if(duration==="")return  M.toast({html:"Duration is empty",className:""})
        if(difficulty==="")return M.toast({html:"Difficulty is empty",className:""})
        

        fetch("/createPost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                projectName,
                description,
                duration,
                difficulty
            })
        }).then(res=>res.json()).then(data=>{
            if(errorHandler(data,M,history))console.log(data.error)
            else{
                M.toast({html:"Post was successfully created",className:""})
                history.push("/post/"+data._id)
            }
        })
    }
    return(
        <div className="">
            <div className="card auth-card input-field">
                <div>
                    <h1 className="card-title">Create Post</h1>
                </div>
                <div className="input-field col s6"> 
                    <label><strong>Enter Project Name</strong></label>
                    <input type="text" onChange={(e)=>setProjectName(e.target.value)} value={projectName}/>
                </div>
                <div className="input-field col s6"> 
                    <label><strong>Enter Project Description</strong></label>
                    <textarea rows="6" cols="50" type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div className="input-field col s6"> 
                    <label><strong>Enter Duration</strong></label>
                    <input type="text" onChange={(e)=>setDuration(e.target.value)} value={duration}/>
                </div>
                <div className="input-field col s6"> 
                    <label><strong>Enter Difficulty</strong></label>
                    <input type="text" onChange={(e)=>setDifficulty(e.target.value)} value={difficulty}/>
                </div>

                <button className="btn navBtn blue darken-4" onClick={()=>createPost()}>Create Post</button>
            </div>
        </div>
    )

}

export default CreatePost