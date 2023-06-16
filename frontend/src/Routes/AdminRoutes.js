import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Adminlogin from '../Pages/Admin/Adminlogin'
import AdminHome from '../Pages/Admin/AdminHome'
import AdminPublic from './AdminPublic'
import AdminProtect from './AdminProtect'
import AddUser from '../Pages/Admin/AddUser'
import EditUser from '../Pages/Admin/EditUser'

function AdminRoutes() {
  return (
    <Routes>
    <Route exact path="/login" element={ <AdminPublic> <Adminlogin/> </AdminPublic> }/>
    <Route exact path="/home" element={ <AdminProtect> <AdminHome/>   </AdminProtect> }/>
    <Route exact path="/adduser" element={ <AdminProtect> <AddUser/>   </AdminProtect> }/>
    <Route exact path="/edituser/:id" element={ <AdminProtect> <EditUser/>   </AdminProtect> }/>


  </Routes>
 
  )
}

export default AdminRoutes