import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ScholarshipApplyDetails = () => {
  const { user } = useAuth();
  const applyData = useLoaderData();
  const { _id,
    applicantPhoneNumber,
    applicantAddressVillage,
    applicantAddressDistrict,
    applicantAddressCountry,
    applicantGender,
    applicantApplyingDegree,
    sscResult,
    hscResult,
    studyGap,
    universityName,
    scholarshipCategory,
    subjectCategory,
    email,
    userDisplayName,
    scholarshipId,
    applyDate,
    applicantPhoto
  } = applyData;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const loadApplyData = async () => {
    const res = await axiosSecure.get(`/scholarshipApply/${user.email}`)
    console.log(res.data);
    if (Array.isArray(res.data)) {
      const filterApply = res.data.some(apply => apply._id === _id);
      if (filterApply) return true;
      return false;
    } else {
      console.log('Response data is not an array.');
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const alreadyApply = await loadApplyData();
      if (!alreadyApply) {
        console.log('alreadyApply', alreadyApply);
        navigate(`/all-scholarship`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="card md:w-3/4 m-5 bg-base-100 shadow-xl">
        <figure>
          {applicantPhoto && <img src={applicantPhoto} alt="Applicant Photo" />}
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {userDisplayName}
            <div className="badge badge-secondary">Applied</div>
          </h2>
          <p><span className="font-bold">Applicant Phone Number:</span> {applicantPhoneNumber}</p>
          <p><span className="font-bold">Applicant Address:</span> {applicantAddressVillage}, {applicantAddressDistrict}, {applicantAddressCountry}</p>
          <p><span className="font-bold">Gender:</span> {applicantGender}</p>
          <p><span className="font-bold">Applying Degree:</span> {applicantApplyingDegree}</p>
          <p><span className="font-bold">SSC Result:</span> {sscResult}</p>
          <p><span className="font-bold">HSC Result:</span> {hscResult}</p>
          <p><span className="font-bold">Study Gap:</span> {studyGap}</p>
          <p><span className="font-bold">University Name:</span> {universityName}</p>
          <p><span className="font-bold">Scholarship Category:</span> {scholarshipCategory}</p>
          <p><span className="font-bold">Subject Category:</span> {subjectCategory}</p>
          <p><span className="font-bold">Applicant Email:</span> {email}</p>
          <p><span className="font-bold">Apply Date:</span> {applyDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplyDetails;