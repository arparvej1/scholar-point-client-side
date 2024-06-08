import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BiDetail } from "react-icons/bi";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { RiFeedbackLine } from 'react-icons/ri';
import { MdCancel } from 'react-icons/md';

const AppliedScholarshipRow = ({ application, allFunctions }) => {
  const axiosSecure = useAxiosSecure();
  const [scholarshipName, setScholarshipName] = useState('');
  const { handleViewDetails, handleCancel, handleFeedback } = allFunctions;
  // const [selectedApplication, setSelectedApplication] = useState({ ...application });

  useEffect(() => {
    const loadApplyData = async () => {
      const res = await axiosSecure.get(`/scholarship/${application?.scholarshipId}`)
      // console.log(res.data);
      setScholarshipName(res.data.scholarshipName);
      // setSelectedApplication({ ...application, scholarshipName: res.data.scholarshipName });
    };

    loadApplyData();
  }, []);
  return (
    <tr key={application._id}>
      <td>{application.universityName}</td>
      <td>{scholarshipName}</td>
      <td>{application.scholarshipCategory}</td>
      <td>{application.subjectCategory}</td>
      <td>{application.applicantApplyingDegree}</td>
      <td>{application.applicationFees}</td>
      <td>{application.serviceCharge}</td>
      <td>{application.applicationStatus}</td>
      <td className="flex gap-2">
        <button className="text-xl text-blue-500" title="Details" onClick={() => handleViewDetails(application)}><BiDetail /></button>
        <button className="text-xl text-yellow-500" title="Feedback" onClick={() => handleFeedback(application)}><RiFeedbackLine /></button>
        <button className="text-xl text-red-500" title="Cancel" onClick={() => handleCancel(application)}><MdCancel /></button>
      </td>
    </tr>
  );
};

AppliedScholarshipRow.propTypes = {
  application: PropTypes.object,
  allFunctions: PropTypes.object
};

export default AppliedScholarshipRow;