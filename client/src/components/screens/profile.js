import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from "../../App"

import errorHandler from '../../utils/errorHandler'

const UserProfile = () => {
    const [posts, setPosts] = useState([])
    const history =useHistory()
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        getUserPosts()
    }, [])


    const getUserPosts=()=>{
        fetch("/getUserPosts",{
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>res.json()).then(data=>{
            if(errorHandler(data,M,history))console.log(data.error)
            else{
                setPosts(data.posts)
            }
        })
    }
    const deletePost=(_id)=>{
        var con = window.confirm("Are you sure?")
        if(con)
        fetch("/deletePost/"+_id,{
            method:"delete",
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>res.json()).then(data=>{
            if(errorHandler(data,M,history))console.log(data.error)
            else{
               getUserPosts()
            }
        })
    }
    return (
        <div  className="backgroundHome">
            <div>
                {state &&
                    <div className="profile-card ">
                        <div className="col s12 m6 center">
                            <div className="card white darken-1">
                                <div className="card-content black-text">
                                    <span className="card-title"><strong>{state.firstName + " " + state.lastName}</strong></span>
                                    <p><strong>Program:</strong>{state.program}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>


            <div>
                <h4 className="center white-text">Projects: </h4>
            </div>


            {
                posts.map((post, index) => {
                    return (
                        <div className="profile-card">
                            <div className="col s12 m6 center">
                                <div className="card white darken-1">
                                <div className="card-content black-text">
                                            <h5 className="card-title">
                                                <Link to={"/post/"+post._id}><strong>{post.projectName}</strong></Link>
                                            </h5>
                                            <p><strong>Duration:</strong>{post.duration}</p>
                                            <p><strong>Difficulty:</strong>{post.difficulty}</p>
                                    </div>
                                    <div className="card-action">
                                            <button className="btn blue darken-4" onClick={()=>history.push("/edit/"+post._id)}>Edit</button>
                                            <button className="btn red darken-4" onClick={()=>deletePost(post._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserProfile