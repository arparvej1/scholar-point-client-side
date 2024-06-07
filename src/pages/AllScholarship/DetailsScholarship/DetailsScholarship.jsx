import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import ReactStars from "react-rating-stars-component";
import ScholarshipReviewDisplay from "../ScholarshipReview/ScholarshipReviewDisplay";

const DetailsScholarship = () => {
  const { user } = useContext(AuthContext);
  const scholarship = useLoaderData();
  const {
    _id,
    scholarshipName,
    universityName,
    universityLogo,
    universityCountry,
    universityCity,
    universityRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipPostDate,
    scholarshipDescription,
    postedUserEmail,
    postedUserDisplayName
  } = scholarship;
  const navigate = useNavigate();

  const handleApplyScholarship = () => {
    console.log('handleApplyScholarship', scholarship);
    navigate(`/payment/${_id}`);
  };
  // ---------------- review start ---------------------
  const [reviews, setReviews] = useState([]);
  const loadReview = () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/reviewsFilter?scholarshipId=${_id}`)
      .then(function (response) {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadReview();
  }, []);
  // ---------------- review end ---------------------

  return (
    <>
      <Helmet>
        <title> {scholarshipName} | ScholarPoint </title>
      </Helmet>
      {/* ---------------- scholarship details ------------------- */}
      <div>
        <div className="flex flex-col md:flex-row gap-12 mt-10 justify-center">
          <div className="bg-base-300 rounded-3xl p-16 flex justify-center">
            <img className="max-h-48" src={universityLogo} alt={universityName} />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-4xl">{universityName}</h3>
            <hr />
            <p className="text-justify"><span className="font-bold">University Rank:</span> {universityRank}</p>
            <p className="text-justify"><span className="font-bold">University Address:</span> {universityCity}, {universityCountry}</p>
            <p className="text-justify"><span className="font-bold">Application Fees:</span> {applicationFees}</p>
            <p className="text-justify"><span className="font-bold">Degree:</span> {degree}</p>
            <hr />
            <div className="flex flex-wrap gap-3">
              <button onClick={handleApplyScholarship} className="btn bg-secondary text-secondary-content hover:bg-primary border-gray-500 px-6">Apply Scholarship</button>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-4xl">{scholarshipName}</h3>
          <p className="text-justify"><span className="font-bold">Scholarship Category:</span> {scholarshipCategory}</p>
          <p className="text-justify"><span className="font-bold">Application Deadline:</span> {applicationDeadline}</p>
          <p className="text-justify"><span className="font-bold">Subject Category:</span> {subjectCategory}</p>
          {/* TODO: <p className="text-justify"><span className="font-bold">Stipend:</span> {Stipend}</p> */}
          <p className="text-justify"><span className="font-bold">Post Date:</span> {scholarshipPostDate}</p>
          <p className="text-justify"><span className="font-bold">Service Charge:</span> {serviceCharge}</p>
          <p className="text-justify"><span className="font-bold">Tuition Fees:</span> {tuitionFees}</p>
          <p className="text-justify"><span className="font-bold">Scholarship Description:</span> {scholarshipDescription}</p>
          <hr />
          <div>
          </div>
        </div>
      </div>
      {/* ---------- review add --------- */}
      <div>
        {
          reviews.length > 0 &&
          <ScholarshipReviewDisplay
            reviews={reviews}
          ></ScholarshipReviewDisplay>
        }
      </div>
      <ToastContainer />
    </>
  );
};

export default DetailsScholarship;