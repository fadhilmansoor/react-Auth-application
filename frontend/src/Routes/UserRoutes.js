import {Routes,Route} from "react-router-dom"
import Login from '../Pages/User/Login'
import Registration from '../Pages/User/Registration'
import Home from '../Pages/User/Home'
import ProfilePage from "../Pages/User/Profile"
import UserPublic from "./UserPublic"
import UserProtect from "./UserProtect"

import React from 'react'

function UserRoutes() {
  return (

    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path="/login" element={ <UserPublic>  <Login/>  </UserPublic> }/>
      <Route exact path='/register' element={ <UserPublic>  <Registration/>  </UserPublic> }/>
      <Route excat path='/profile' element={ <UserProtect> <ProfilePage/> </UserProtect> }/>
    </Routes>
  
  )
}

export default UserRoutes