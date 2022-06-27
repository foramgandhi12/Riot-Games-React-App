import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'

import errorHandler from '../../utils/errorHandler'


const EditPost =()=>{
    const [projectName,setProjectName]=useState("")
    const [description,setDescription]=useState("")
    const [duration,setDuration]=useState("")
    const [difficulty,setDifficulty]=useState("")
    const history=useHistory()
    const params =useParams()
    useEffect(()=>{
        fetch("/getPost/"+params.id,{
            method: "get",
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json()).then(data => {
            if(errorHandler(data,M,history))console.log(data.error)
            else {
                console.log(data)
                setProjectName(data.savedPost.projectName)
                setDescription(data.savedPost.description)
                setDuration(data.savedPost.duration)
                setDifficulty(data.savedPost.duration)
            }
        })

    },[])
    const updatePost =()=>{
        if(projectName==="")return M.toast({html:"Project Name is empty",className:""})
        if(description==="")return  M.toast({html:"Description is empty",className:""})
        if(duration==="")return  M.toast({html:"Duration is empty",className:""})
        if(difficulty==="")return M.toast({html:"Difficulty is empty",className:""})
        

        fetch("/updatePost",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                projectName,
                description,
                duration,
                difficulty,
                id:params.id
            })
        }).then(res=>res.json()).then(data=>{
            if(errorHandler(data,M,history))console.log(data.error)
            else{
                M.toast({html:"Post was successfully edited",className:""})
                history.push("/post/"+data.id)
            }
        })
    }
    return(
        <div className="">
            <div className="card auth-card input-field">
                <div>
                    <h1 className="card-title">Edit Post</h1>
                </div>
                <div className="input-field col s6"> 
                    <label className="active"><strong>Enter Project Name</strong></label>
                    <input type="text" onChange={(e)=>setProjectName(e.target.value)} value={projectName}/>
                </div>
                <div className="input-field col s6"> 
                    <label className="active"><strong>Enter Project Description</strong></label>
                    <textarea rows="6" cols="50" type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div className="input-field col s6"> 
                    <label className="active"><strong>Enter Duration</strong></label>
                    <input type="text" onChange={(e)=>setDuration(e.target.value)} value={duration}/>
                </div>
                <div className="input-field col s6"> 
                    <label className="active"><strong>Enter Difficulty</strong></label>
                    <input type="text" onChange={(e)=>setDifficulty(e.target.value)} value={difficulty}/>
                </div>

                <button className="btn navBtn blue darken-4" onClick={()=>updatePost()}>Update Post</button>
            </div>
        </div>
    )

}

export default EditPost