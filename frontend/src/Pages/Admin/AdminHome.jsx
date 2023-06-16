import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getUsers, deleteUser } from '../../Api/AdminApi';

function AdminHome() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  

  useEffect(() => {
    getUsers()
      .then(response => {
        const allUsers = response.data.data;
        setUsers(allUsers);
      })
      .catch(error => {
        console.error('Error retrieving users:', error);
      });
  }, []);

  const handleLogout = async (e) => {
    localStorage.removeItem("AdminToken");
    navigate('/admin/login');
  }

  // const handleDeleteEmail = async(userId)=>{
  //   deleteid()
  // }

  const handleDeleteUser = async (userId) => {
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter(user => user._id !== userId));
        console.log('User deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Admin Home</Link>
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
              <button onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="jumbotron jumbotron-fluid bg-secondary text-white text-center mb-0" style={{ height: "700px" }}>
          <div className="container pt-5">
            <h2>User List:</h2>
            <div className="mb-3">
              <label htmlFor="searchInput" className="form-label">Search:</label>
              <input
                type="text"
                className="form-control"
                id="searchInput"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>
                    {/* <button
                        onClick={() => handleDeleteEmail(user._id)}
                        className="btn btn-danger mr-2"
                      >
                        Delete
                      </button> */}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn btn-danger mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/admin/edituser/${user._id}`)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => navigate("/admin/adduser")}
              className="btn btn-success"
            >
              Add New User
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminHome;
