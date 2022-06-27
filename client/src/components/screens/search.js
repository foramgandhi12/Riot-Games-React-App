import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory, useLocation } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from "../../App"
import errorHandler from '../../utils/errorHandler'

const Search = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    const [search, setSearch] = useState("")
    const [posts, setPosts] = useState([])
    const location = useLocation();

    useEffect(() => {
        searchForQuery()
    },[])

    const searchForQuery = () => {
        let query=""
        if (location.search) {
            setSearch(location.search.slice(1))
            query = location.search.slice(1)
            console.log(location.search.slice(1))
        }
        fetch("/searchPosts/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res => res.json()).then(data => {
            if (errorHandler(data, M, history)) console.log(data.error)
            else {
                setPosts(data.savedPosts)
                console.log(data)
            }
        })
    }

    const searchPush = () => {
        history.push({
            pathname: '/search',
            search: `${search}`
        })
        history.go(0)
    }
    return (
        <div className="backgroundHome backgroundSearch">
            <div className="auth-card backgroundWhite">
                <div className="Search">
                    <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search}></input>
                    <button className="btn blue darken-4" onClick={() => searchPush()}>Search</button>
                </div>
                <div className="center">
                    {posts.map((post, index) => {
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
                    })

                    }

                </div>
            </div>
        </div>
    )
}

export default Search