import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileUpdation } from '../../Api/UserApi';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/User/UserSlice';
import { ToastContainer,toast } from 'react-toastify';

function ProfilePage() {
  const { email,id,image} = useSelector(state => state.user);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch()
 
 

  const handleSubmit = async(e) => {
    e.preventDefault()
    const response = await ProfileUpdation(id,photo)
    console.log(response);
    if(response.data.updated){
      console.log("updation");
      dispatch(setUserDetails({
        id:response.data.data._id,
        email:response.data.data.email, 
        image:response.data.data.image
      }))
       
    }else{
        console.log("np response");
    }
  };

  return (
    <div className="container">
      <h3>User Profile</h3>

      <div className="card">
        <div className="card-body text-center">
          <img
            src={image ? `/images/${image}` : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"}
            className="img-fluid"
            alt="Profile"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />

          <h3>{email}</h3>

          <div className="mt-5">
            <input type="file" accept="image/*" onChange={(e)=>{setPhoto(e.target.files[0])}} />
          </div>

          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Add Photo
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default ProfilePage;
