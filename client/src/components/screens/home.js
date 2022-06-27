import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from "../../App"
import errorHandler from '../../utils/errorHandler'

const Home = () => {
    const [posts, setPosts] = useState()
    const [search, setSearch] = useState("")
    const history = useHistory()

    useEffect(() => {
        fetch('/getLastThreePosts', {
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (errorHandler(data, M, history)) console.log(data.error)
            else {
                setPosts(data.savedPosts)
                console.log(data)
            }
        })
    }, [])


    return (
        <div>
            <div className="backgroundHomeSearch ">
                <h2 className="center noMargin white-text"><strong>ProjectFinder</strong></h2>
                <h6 className="center white-text"><strong>Find projects and work in teams to help boost your portfolio</strong></h6>
                <div className="card auth-card input-field">
                    <div>
                        <input type="text" value={search} className="validate" onChange={(e) => { setSearch(e.target.value) }} placeholder="Enter your search here" />
                        <button className="btn blue darken-4" onClick={() => history.push({
                            pathname: '/search',
                            search: `${search}`
                        })}>Search</button>
                    </div>

                </div>
            </div>
            <div>
                <h5 className="center black-text"><strong>Most Recent Projects</strong></h5>
                <div className="grid-container">
                    {posts && posts.map((post) => {
                        return (
                            <div className="card white darken-1">
                                <div className="card-content black-text">
                                    <h5 className="card-title"><Link to={`/post/${post._id}`}>{post.projectName}</Link></h5>
                                    <p><strong>Post Owner:</strong>{post.postOwner.firstName + " " + post.postOwner.lastName}</p>
                                    <p><strong>Difficulty:</strong>{post.difficulty}</p>
                                    <p><strong>Duration:</strong>{post.duration}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Home

