import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import MyApplicationCard from './MyApplicationCard';
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myApply, setMyApply] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/scholarshipApply/${user.email}`);
        setMyApply(res.data);
      } catch (error) {
        console.error('Error fetching applied scholarships:', error);
      }
    };
    fetchData();
  }, []);


  const handleCancelApplication = _id => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/apply/${_id}`)
          .then(function (response) {
            // handle success
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your scholarship apply has been deleted.',
                'success'
              )
              const remaining = myApply.filter(i => i._id !== _id);
              setMyApply(remaining);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
    })
  }

  return (
    <div>
      <Helmet>
        <title> My Applications | ScholarPoint </title>
      </Helmet>
      <h2 className='text-center p-3 my-3 md:my-0 bg-accent text-accent-content font-semibold rounded-xl text-lg md:text-xl lg:text-2xl'>My Applications</h2>
      <div className="overflow-x-auto m-3 border-2 p-3 rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className='text-center'>University<br />Name</th>
              <th className='text-center'>University<br />Address</th>
              <th className='text-center'>Subject<br />Category</th>
              <th className='text-center'>Applied<br />Degree</th>
              <th className='text-center'>Application<br />Fees</th>
              <th className='text-center'>Service<br />Charge</th>
              <th className='text-center'>Application<br />Status</th>
              <th className='text-center'>Details</th>
              <th className='text-center'>Edit</th>
              <th className='text-center'>Cancel</th>
              <th className='text-center'>Add <br />Review</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {myApply.map((application) => (
              <MyApplicationCard
                key={application._id}
                application={application}
                handleCancelApplication={handleCancelApplication}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyApplication;
