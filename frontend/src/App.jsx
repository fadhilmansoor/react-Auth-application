import {BrowserRouter,Route,Routes} from "react-router-dom"
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'


import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/*" element={<UserRoutes/>}/>
         <Route path="/admin/*" element={<AdminRoutes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App