import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Adminlogin } from '../../Api/AdminApi'

function Login() {
    const navigate = useNavigate()
    const [value, setValue] = useState({
        email: '',
        password: ''
      })
 
    const HandelSubmit = async (e) =>{
        e.preventDefault()
        const { email, password } = value
        try {
            if(!email){
                toast("email is required")
            }else if(!password){
                toast("password is required")
            }else{
                const response = await Adminlogin(value)
                toast(response.data.alert)
                if(response.data.status){
                  localStorage.setItem("AdminToken",response.data.token)
                  navigate('/admin/home')
                }
            }
        } catch (error) {
            
        }
    }  
    
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card mt-5" >
            <div className="card-body">
              <h5 className="card-title text-center">Admin Login</h5>
              <form onSubmit={HandelSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" name='email' className="form-control" id="email" placeholder="Enter email"
                    onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name='password' className="form-control" id="password" placeholder="Password"
                    onChange={(e) => { setValue({ ...value, [e.target.name]: e.target.value }) }} />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default Login