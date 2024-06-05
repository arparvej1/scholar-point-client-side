import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ScholarshipApplyForm = () => {
  const scholarship = useLoaderData();
  const { user } = useAuth();
  const { _id, scholarshipName } = scholarship;
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  // const { data: payments = [] } = useQuery({
  //   queryKey: ['payments', user.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/payments/${user.email}`)
  //     console.log(res.data);
  //     return res.data;
  //   }
  // });


  const loadPayments = async () => {
    const res = await axiosSecure.get(`/payments/${user.email}`)
    console.log(res.data);
    // setPayments(res.data);
  };

  useEffect(() => {
    loadPayments();
  }, [])

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