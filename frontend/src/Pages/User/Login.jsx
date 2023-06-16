import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import {useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserLogin } from '../../Api/UserApi';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/User/UserSlice';



function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState({
    email: '',
    password: ''
  })

  const GenerateError = (err) => {
    toast.error(err, {
      position: 'top-center',
      theme: 'colored',
      autoClose: 3000
    });
  };

  const HandelSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = value
    try {
      if (!email) {
        console.log("no email");
        GenerateError("Email is required")
      } else if (!password) {
        GenerateError("Password is required")
      } else {

        const response = await UserLogin(value)

        GenerateError(response.data.alert)
      
        if(response.data.status){
          localStorage.setItem("token",response.data.token)
          dispatch(setUserDetails({
            id:response.data.user._id,
            email:response.data.user.email,
            image:response.data.user.image
          }))
          navigate('/')
        }
        
      }
    } catch (error) {
         console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card mt-5" >
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
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
                <div className="text-center mt-3">
                  <span>No account? <Link to="/register">Register</Link></span>
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