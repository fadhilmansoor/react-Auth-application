import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { findUser,updateName } from '../../Api/AdminApi';
import { useNavigate } from 'react-router-dom';

function EditUser() {
  const navigate = useNavigate() 
  const [email, setEmail] = useState("")
  const { id } = useParams();

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        console.log("useeffect");
        const response = await findUser(id)
        setEmail(response.data.user.email)
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData()

  }, [id]);

  const HandelSubmit=async (e)=>{
    try{
      e.preventDefault()
      if(email.length ===0){
        toast("email required")
      }else{
        const response = await updateName(id,email)
        if(response.data.updated){
           navigate('/admin/home')
        }else{
          toast('something went wrong')
        }
      }
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card mt-5" >
            <div className="card-body">
              <h5 className="card-title text-center">Edit User Name</h5>
              <form onSubmit={HandelSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" name='email' value={email} className="form-control" id="email"
                    onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">submit</button>
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

export default EditUser