import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [sortOption, setSortOption] = useState('name');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    const loadAllUsers = async () => {
      try {
        const res = await axiosSecure.get(`/allUsers/${user.email}`);
        setAllUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    loadAllUsers();
  }, [axiosSecure, user.email]);

  const handleRoleChange = (e, selectUser) => {
    if (selectUser.email === user.email) {
      return toast.error('You cannot change your role!');
    }
    const newRole = e.target.value;
    const updatedUsers = allUsers.map(user => user._id === selectUser._id ? { ...user, role: newRole } : user);
    setAllUsers(updatedUsers);
  };

  const handleMakeChange = (selectUser) => {
    if (selectUser.email === user.email) {
      return toast.error('You cannot change your role!');
    }
    const new_role = {
      role: selectUser.role,
    };
    axiosSecure.patch(`/updateUser/${selectUser._id}`, new_role)
      .then(function (response) {
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Role Update!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteUser = (selectUser) => {
    if (selectUser.email === user.email) {
      return toast.error('You cannot delete it yourself!');
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
        axiosSecure.delete(`/userDelete/${selectUser.email}`)
          .then(function (response) {
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
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Apply sorting and filtering
  let sortedAndFilteredUsers = [...allUsers];
  sortedAndFilteredUsers.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'email') {
      return a.email.localeCompare(b.email);
    } else if (sortOption === 'role') {
      return a.role.localeCompare(b.role);
    }
  });

  if (filterOption !== 'all') {
    sortedAndFilteredUsers = sortedAndFilteredUsers.filter(user => user.role === filterOption);
  }

  return (
    <div>
      <Helmet>
        <title> Manage Users | ScholarPoint </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">Manage Users</h3>
      
      <div className="flex justify-end space-x-4 p-4">
        <div>
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter">Filter By Role:</label>
          <select id="filter" value={filterOption} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="agent">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
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
            {sortedAndFilteredUsers.map(thisUser => (
              <tr key={thisUser._id}>
                <td>{thisUser.name}</td>
                <td>{thisUser.email}</td>
                <td>
                  <select
                    value={thisUser.role}
                    onChange={(e) => handleRoleChange(e, thisUser)}
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
