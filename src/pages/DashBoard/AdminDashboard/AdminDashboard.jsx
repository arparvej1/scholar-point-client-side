import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [allScholarshipApply, setAllScholarshipApply] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const [allAgent, setAllAgent] = useState([]);

  const loadAllAdminAndAgent = async () => {
    try {
      const res = await axiosSecure.get(`/allAdminAndAgent/${user.email}`);
      setAllAdmin(res.data.allAdmin);
      setAllAgent(res.data?.allAgent);
    } catch (error) {
      console.error('Error fetching applied scholarships:', error);
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

  const loadReviews = async () => {
    try {
      const response = await axiosSecure.get(`/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    loadAllAdminAndAgent();
    loadAllScholarshipApply();
    loadReviews();
  }, []);

  return (
    <div>
      <Helmet>
        <title> Admin Dashboard | ScholarPoint </title>
      </Helmet>
      <h3 className="text-2xl">Welcome Admin, <span className="font-semibold">{user.displayName}!</span></h3>
      <div className="flex flex-col gap-2 mt-3">
        {
          allAdmin.length > 0 ?
            <p>Total admin: {allAdmin.length}.</p> :
            <p>No admin found.</p>
        }
        {
          allAgent.length > 0 ?
            <p>Total moderator: {allAgent.length}.</p> :
            <p>No moderator found.</p>
        }
        {
          allScholarshipApply.length > 0 ?
            <p>Total: {allScholarshipApply.length} scholarships apply.</p> :
            <p>No scholarship apply.</p>
        }
        {
          reviews.length > 0 ?
            <p>Total: {reviews.length} reviews.</p> : <p>No reviews</p>
        }
      </div>
    </div>
  );
};

export default AdminDashboard;