import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BiDetail, BiMessageDetail, BiXCircle } from "react-icons/bi";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AppliedScholarshipCard = ({ application, onViewDetails, onCancel }) => {
  const axiosSecure = useAxiosSecure();
  const [scholarshipName, setScholarshipName] = useState('');

  useEffect(() => {
    const loadApplyData = async () => {
      const res = await axiosSecure.get(`/scholarship/${application.scholarshipId}`)
      console.log(res.data);
      setScholarshipName(res.data.scholarshipName)
    };

    loadApplyData();
  }, []);
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{scholarshipName}</h2>
        <p><strong>University Name:</strong> {application.universityName}</p>
        <p><strong>Scholarship Category:</strong> {application.scholarshipCategory}</p>
        <p><strong>Subject Category:</strong> {application.subjectCategory}</p>
        <p><strong>Applied Degree:</strong> {application.applicantApplyingDegree}</p>
        <p><strong>Application Fees:</strong> {application.applicationFees}</p>
        <p><strong>Service Charge:</strong> {application.serviceCharge}</p>
        <p><strong>Application Status:</strong> {application.applicationStatus}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary mr-2" onClick={() => onViewDetails(application)}>
            <BiDetail /> Details
          </button>
          <button className="btn btn-accent mr-2">
            <BiMessageDetail /> Feedback
          </button>
          <button className="btn btn-error" onClick={() => onCancel(application)}>
            <BiXCircle /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

AppliedScholarshipCard.propTypes = {
  application: PropTypes.object,
  onViewDetails: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AppliedScholarshipCard;