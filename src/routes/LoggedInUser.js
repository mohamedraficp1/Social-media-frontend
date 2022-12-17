import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../pages/Login'

function LoggedInUser() {
  const {user}= useSelector((state)=>({...state}))
  return user ? <Outlet /> : <Login />
}

export default LoggedInUser