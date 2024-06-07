import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AgentDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [allScholarshipApply, setAllScholarshipApply] = useState([]);

  const loadReviews = async () => {
    try {
      const response = await axiosSecure.get(`/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const loadAllScholarshipApply = async () => {
    try {
      const res = await axiosSecure.get(`/allScholarshipApply/${user.email}`);
      setAllScholarshipApply(res.data);
    } catch (error) {
      console.error('Error fetching applied scholarships:', error);
    }
  };

  useEffect(() => {
    loadReviews();
    loadAllScholarshipApply();
  }, []);

  return (
    <div>
      <Helmet>
        <title> Agent Dashboard | ScholarPoint </title>
      </Helmet>
      <h3 className="text-2xl">Welcome Moderator, <span className="font-semibold">{user.displayName}!</span></h3>
      <br />
      {
        allScholarshipApply.length > 0 ?
          <p>Total: {allScholarshipApply.length} scholarships apply.</p> :
          <p>No scholarship apply.</p>
      }
      <br />
      {
        reviews.length > 0 ?
          <p>Total: {reviews.length} reviews.</p> : <p>No reviews</p>
      }
    </div>
  );
};

export default AgentDashboard;