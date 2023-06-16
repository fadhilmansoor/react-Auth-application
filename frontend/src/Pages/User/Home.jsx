import React from 'react';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LogoutDetails } from '../../Redux/User/UserSlice';
import { useDispatch } from 'react-redux';

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { email, id } = useSelector(state => state.user);

  const handleLogout = async (e) => {
  console.log(localStorage,'this is the data');
  localStorage.removeItem("token");
  dispatch(LogoutDetails({
    id:'',
    email:'',
    image:''
  }))
  }

  const handleLogin = async (e) => {
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">User Home</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              {id ? (
                <button  onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button  onClick={handleLogin}>
                  Login
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="jumbotron jumbotron-fluid bg-secondary text-white text-center mb-0" style={{ height: "700px" }}>
        <div className="container pt-5">
          <h1 className="display-4 ">Welcome to User Home</h1>
          <h1>{email ? email : "You havent Registerd yet"}</h1>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
