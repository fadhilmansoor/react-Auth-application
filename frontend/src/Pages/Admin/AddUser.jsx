import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { newUser } from '../../Api/AdminApi'
import { useNavigate } from 'react-router-dom'

function AddUser() {
    const navigate = useNavigate()
    const [value, setValue] = useState({
        email: '',
        password: ''
      })

    const HandelSubmit = async(e)=>{
        try {
            e.preventDefault()
            const{email,password}=value
            if(!email){
                toast("Email is required")
            }else if(!password){
                toast("Password is required")
            }else{
                const response = await newUser(value)
                toast(response.data.alert)
                if(response.data.status){
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
            <h5 className="card-title text-center">Add New User</h5>
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
                <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddUser