import React, { useEffect, useState,useReducer } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import LoggedInUser from './routes/LoggedInUser';
import NotLoggedInUser from './routes/NotLoggedInUser';
import CreatePostPopup from './components/createPostPopup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { postsReducer } from './functions/reducers';
import Messenger from './pages/Messenger';
import MarketPlace from './pages/marketPlace';
import Cart from './pages/Cart';
import GooglePay from './components/googlePay/googlePay';
import { useSelector } from 'react-redux';
import Lobby from './components/Socket';

function App() {
  const [visible, setVisible] =useState(false)
  const [newPost, setNewpost] = useState(false)
  const [{loading,posts,error}, dispatch] = useReducer(postsReducer,{
    loading: false,
    posts:[],
    error:""
  })

  const {user} =useSelector((user) => ({ ...user }))
  useEffect(() => { 
      getAllPost()
      console.log(newPost)
  }, [newPost])
  
  console.log(newPost)

  const getAllPost =async()=>{
      try {
        dispatch({
          type:"POST_REQUEST"
        })
        const {data} = await axios.get("http://localhost:5000/getAllPost")
            dispatch({
        type:"POST_SUCCESS",
        payload:data
        
        })
        
      } catch (error) {
        dispatch({
          type:"POST_ERROR",
          payload:error.response.data.message
          })
      }
  }
  console.log(posts);
  return (
    <>
    {visible &&<CreatePostPopup setNewpost={setNewpost} setVisible={setVisible}/>}
    <Lobby />
      <Routes>
        <Route element={<NotLoggedInUser />}>
          <Route path="/login" element={<Login />} exact />

        </Route>
        <Route element={<LoggedInUser />} >
          <Route path="/" element={<Home setVisible={setVisible} posts={posts}/>} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/profile/:username" element={<Profile />} exact />
          <Route path="/messenger" element={<Messenger />} exact />
          <Route path="/marketPlace" element={<MarketPlace />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/googlePay" element={<GooglePay/>} exact />
        </Route>

      </Routes>
    </>
  );
}

export default App;
