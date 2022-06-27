import React, { useEffect,useContext, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from "../App"


const Navbar = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)


    const renderList = () => {
        if (!state) {
            return [
                <li><Link to="/home">Home</Link></li>,
                <li><Link to="/search">Search</Link></li>,
                <li>
                    <button className="btn navBtn blue darken-4" onClick={() => history.push("/login")}>
                        Login
                </button>
                </li>,
                <li>
                    <button className="btn navBtn blue darken-4" onClick={() => history.push("/signup")}>
                        Signup
            </button>
                </li>
            ]
        }
        else {
            return [
                <li><Link to="/home">Home</Link></li>,
                <li><Link to="/search">Search</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li>
                    <button className="btn navBtn blue darken-4" onClick={() => history.push("/createPost")}>
                        CreatePost
                    </button>
                </li>,
                <li>
                    <button className="btn navBtn blue darken-4" onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        history.push("/login")
                    }}>
                        Logout
            </button>
                </li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper newColorBlue">
                <Link to="/home" className="brand-logo left">ProjectFinder</Link>
                <ul className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}


export default Navbar