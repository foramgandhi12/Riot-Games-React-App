import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from "../../App"
import errorHandler from '../../utils/errorHandler'


const ShowProfile = () => {
    const [posts, setPosts] = useState([])
    const [user,setUser]=useState()
    const history =useHistory()
    const { state, dispatch } = useContext(UserContext)
    const params = useParams()
    useEffect(() => {
        getUserData()
        getUserPosts()
    }, [])


    const getUserPosts=()=>{
        fetch("/getUserPosts/"+params.id,{
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>res.json()).then(data=>{
            if(errorHandler(data,M,history))console.log(data.error)
            else{
                console.log(posts)
                setPosts(data.posts)
            }
        })
    }

    const getUserData=()=>{
        fetch("/getUserData/"+params.id,{
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>res.json()).then(data=>{
            if(errorHandler(data,M,history))console.log(data.error)
            else{
                console.log(data.savedUser)
                setUser(data.savedUser)
            }
        })
    }
  
    return (
        <div className="backgroundHome">
            <div>
                {user &&
                    <div className="profile-card ">
                        <div className="col s12 m6 center">
                            <div className="card white darken-1">
                                <div className="card-content black-text">
                                    <span className="card-title"><strong>{user.firstName + " " + user.lastName}</strong></span>
                                    <p><strong>Program:</strong>{user.program}</p>
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
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShowProfile