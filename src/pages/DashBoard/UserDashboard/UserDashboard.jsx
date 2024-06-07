import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [myApply, setMyApply] = useState([]);

  const loadReviews = async () => {
    try {
      const response = await axiosSecure.get(`/myReviews/${user.email}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const loadMyApply = async () => {
    try {
      const res = await axiosSecure.get(`/scholarshipApply/${user.email}`);
      setMyApply(res.data);
    } catch (error) {
      console.error('Error fetching applied scholarships:', error);
    }
  };

  useEffect(() => {
    loadReviews();
    loadMyApply();
  }, []);

  return (
    <div>
      <Helmet>
        <title> Dashboard | ScholarPoint </title>
      </Helmet>
      <h3 className="text-2xl">Welcome, <span className="font-semibold">{user.displayName}!</span></h3>
      <br />
      {myApply.length > 0 ?
        <p>You have applied for a total of {myApply.length} {myApply.length > 1 ? 'scholarships' : 'scholarship'}.</p> :
        <p>You have not applied for any scholarship.</p>
      }
      <br />
      {reviews.length > 0 ?
        <p>Your total number of reviews is {reviews.length}.</p> : myApply.length > 0 ?
          <p>You have no reviews</p>
          : ''}
    </div>
  );
};

export default UserDashboard;