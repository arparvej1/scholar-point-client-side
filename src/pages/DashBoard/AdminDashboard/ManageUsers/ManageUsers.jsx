import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loadAllUsers, setLoadAllUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const callLoadAllUsers = async () => {
    try {
      const res = await axiosSecure.get(`/allUsers/${user.email}`);
      setAllUsers(res.data);
      setLoadAllUsers(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error('Error fetching applied scholarships:', error);
    }
  };

  useEffect(() => {
    callLoadAllUsers();
  }, []);

  const handleRoleChange = (selectUser, newRole) => {
    if (selectUser.email === user.email) {
      return toast.error('You cannot change your role!')
    }
    const updatedUsers = allUsers.map(user => user._id === selectUser._id ? { ...user, role: newRole } : user);
    setAllUsers(updatedUsers);
  };

  const handleMakeChange = (selectUser) => {
    if (selectUser.email === user.email) {
      return toast.error('You cannot change your role!')
    }
    // console.log(selectUser);
    const new_role = {
      role: selectUser.role,
    }
    // --------- send server start -----
    axiosSecure.patch(`/updateUser/${selectUser._id}`, new_role)
      .then(function (response) {
        // console.log(response.data);
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Role Update!",
            showConfirmButton: false,
            timer: 1500
          });
          const updatedUsers = loadAllUsers.map(user => user._id === selectUser._id ? { ...user, role: selectUser.role } : user);
          setLoadAllUsers(updatedUsers);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
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
  // ---------- filter start ----------- 
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    let sortedUsers = [...allUsers]; // Create a copy of allUsers array

    // Sort the array based on the selected value
    sortedUsers.sort((a, b) => {
      if (a[selectedValue] < b[selectedValue]) return -1;
      if (a[selectedValue] > b[selectedValue]) return 1;
      return 0;
    });

    // Update the state with the sorted array
    setAllUsers(sortedUsers);
  };

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    let sortedUsers = [...allUsers]; // Create a copy of allUsers array

    if (selectedValue !== 'all') {
      sortedUsers = loadAllUsers.filter(user => user.role === selectedValue);
      setAllUsers(sortedUsers);
    } else {
      setAllUsers(loadAllUsers);
    }
    console.log(selectedValue);
  };
  // ---------- filter end ----------- 

  return (
    <div>
      <Helmet>
        <title> Manage Users | ScholarPoint </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">Manage Users</h3>
      {/* ---------- filter start ----------- */}
      <div className="flex justify-end space-x-4 p-4">
        <div className='flex gap-2'>
          <label htmlFor="sort">Sort By:</label>
          <select className='border-2' id="sort" onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </select>
        </div>
        <div className='flex gap-2'>
          <label htmlFor="filter">Filter By Role:</label>
          <select className='border-2' id="filter" onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="agent">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      {/* ---------- filter end ----------- */}
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
            {allUsers.map(thisUser => (
              <tr key={thisUser._id}>
                <td>{thisUser.name}</td>
                <td>{thisUser.email}</td>
                <td>
                  <select
                    value={thisUser.role}
                    onChange={(e) => handleRoleChange(thisUser, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="agent">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleMakeChange(thisUser)}>Make Change</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(thisUser)}>Delete</button>
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
