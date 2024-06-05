import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";

const ScholarshipApplyForm = () => {
  const scholarship = useLoaderData();
  const { user } = useAuth();
  const { _id, scholarshipName } = scholarship;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const loadPayments = async () => {
    const res = await axiosSecure.get(`/payments/${user.email}`)
    console.log(res.data);
    if (Array.isArray(res.data)) {
      const scholarshipPayment = res.data.some(payment => payment.scholarshipId === scholarship._id);
      if (scholarshipPayment) return true;
      return false;
    } else {
      console.log('Response data is not an array.');
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const alreadyPurchased = await loadPayments();
      if (!alreadyPurchased) {
        console.log(alreadyPurchased);
        navigate(`/scholarship/${_id}`);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <Helmet>
        <title> Scholarship Apply Form | ScholarPoint </title>
      </Helmet>
      ScholarshipApply: {_id} <br />
      {scholarshipName}
    </div>
  );
};

export default ScholarshipApplyForm;