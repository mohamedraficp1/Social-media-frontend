import React, { useRef, useState } from 'react'
import CreatePost from '../components/createPost'
import Header from '../components/header/index'
import LeftHome from '../components/home/left'
import LeftLink from '../components/home/left/LeftLink'
import RightHome from '../components/home/right'
import Stories from '../components/home/stories'
import Post from '../components/post'
function Home({setVisible, posts,user}) {
  return (
    <div className="home">
      <Header/>
      <LeftHome />
      <div className="home_middle">
        <Stories />
        <CreatePost setVisible={setVisible} />
        {
          posts.map((post) => {
           return <div className="post" key={post._id}>
              <Post key={post._id} post={post} />
            </div>
        
      })
        }
      </div>
      
      <RightHome />
    </div>
    
  )
}

export default Home