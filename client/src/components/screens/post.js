import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from "../../App"
import errorHandler from '../../utils/errorHandler'

const Post = () => {
    const [post, setPost] = useState()
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const params = useParams()
    useEffect(() => {
        
        fetch(`/getPost/${params.id}`, {
            method: "get",
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json()).then(data => {
            if(errorHandler(data,M,history))console.log(data.error)
            else {
                setPost(data.savedPost)
            }
        })
    },[])

    const changeLink=()=>{
        if(state._id===post.postOwner._id )history.push("/profile")
        else history.push("/profile/"+post.postOwner._id)
    }
    return (
        <div>
            {
                post &&state &&
                <div className="card auth-card input-field">
                    <h4 className="title">Project Name: {post.projectName}</h4>

                    <p><strong>Post Owner: </strong><Link onClick={()=>{changeLink()}}  > {post.postOwner.firstName + " " + post.postOwner.lastName}</Link></p>
                    <p><strong>Description: </strong>{post.description}</p>
                    <p><strong>Duration: </strong>{post.duration}</p>
                    <p><strong>Difficulty: </strong>{post.difficulty}</p>
                </div>
            }
        </div>
    )
}

export default Post