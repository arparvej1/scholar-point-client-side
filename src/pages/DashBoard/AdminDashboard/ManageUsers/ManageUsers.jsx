import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);

  const loadAllUsers = async () => {
    try {
      const res = await axiosSecure.get(`/allUsers/${user.email}`);
      setAllUsers(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error('Error fetching applied scholarships:', error);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);


  const handleRoleChange = (userId, newRole) => {
    // Update user role in the database
    // Example: const response = await fetch(`/api/users/${userId}`, { method: 'PUT', body: JSON.stringify({ role: newRole }) });
    // const updatedUser = await response.json();
    // Update user role in the state
    // const updatedUsers = users.map(user => user.id === userId ? { ...user, role: updatedUser.role } : user);
    // setUsers(updatedUsers);
    // For demonstration purpose, updating user role in state directly
    const updatedUsers = allUsers.map(user => user.id === userId ? { ...user, role: newRole } : user);
    setAllUsers(updatedUsers);
  };

  const handleDeleteUser = (selectUser) => {
    if (selectUser.email === user.email) {
      return toast.error('You cannot delete it yourself!')
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // --------- send server start -----
        axiosSecure.delete(`/userDelete/${selectUser.email}`)
          .then(function (response) {
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              const updatedUsers = allUsers.filter(user => user._id !== selectUser._id);
              setAllUsers(updatedUsers);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User deleted successfully.",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // --------- send server end -----
      }
    });
  };

  const handleMakeChange = (userId) => {
    // Implement logic to make changes to the user's information
    // For demonstration purpose, alerting the user ID
    alert(`Make changes for user with ID ${userId}`);
  };

  return (
    <div>
      <Helmet>
        <title> Manage Users | ScholarPoint </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">Manage Users</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Make Change</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace this with your mapping logic */}
            {allUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="agent">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleMakeChange(user._id)}>Make Change</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
