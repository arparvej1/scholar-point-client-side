import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import MyApplicationCard from './MyApplicationCard';
import { Helmet } from 'react-helmet-async';

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

  return (
    <div>
      <Helmet>
        <title> My Applications | ScholarPoint </title>
      </Helmet>
      <h2 className='text-center p-3 my-3 md:my-0 bg-accent text-accent-content font-semibold rounded-xl text-lg md:text-xl lg:text-2xl'>My Applications</h2>
      <div className="overflow-x-auto">
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
              <th className='text-center'>Add <br />Review</th>
              <th className='text-center'>Cancel</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {myApply.map((application) => (
              <MyApplicationCard key={application._id} application={application} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
