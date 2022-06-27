import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { reducer, intialState } from "./reducers/userReducer"
import './App.css';
import Navbar from "./components/navbar"
import Login from "./components/screens/login"
import Signup from "./components/screens/signup"
import CreatePost from "./components/screens/createPost"
import Post from "./components/screens/post"
import UserProfile from "./components/screens/profile"
import EditPost from './components/screens/edit';
import ShowProfile from './components/screens/showProfile';
import Home from './components/screens/home'
import Search from './components/screens/search';
import ResetPassword from './components/screens/resetPassword';
import Newpassword from './components/screens/newPassword'
export const UserContext= createContext()
const Routing = () => {
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(() => {
    const user =  JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({type:"USER",payload:user})
      if(history.location.pathname.startsWith("/login")||history.location.pathname.startsWith("/signup"))history.push("/home")
    }
    else {

    }
  }, [])

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/createPost">
        <CreatePost/>
      </Route>
      <Route exact path="/post/:id">
          <Post />
      </Route>
      <Route exact path="/profile">
        <UserProfile />
      </Route>
      <Route exact path="/edit/:id">
        <EditPost></EditPost>
      </Route>
      <Route exact path="/profile/:id">
        <ShowProfile/>
      </Route>  
      <Route path="/home">
          <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route exact path="/resetPassword">
        <ResetPassword />
      </Route>
      <Route exact path="/resetPassword/:token">
          <Newpassword />
      </Route>
    </Switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, intialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
