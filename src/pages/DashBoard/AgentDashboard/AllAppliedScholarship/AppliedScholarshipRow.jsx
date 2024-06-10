import PropTypes from 'prop-types';
import { BiDetail } from "react-icons/bi";
import { RiFeedbackLine } from 'react-icons/ri';
import { MdCancel, MdOutlineDoneOutline } from 'react-icons/md';

const AppliedScholarshipRow = ({ application, allFunctions }) => {
  const { handleViewDetails, handleCancel, handleAccept, handleFeedback } = allFunctions;

  return (
    <tr className="hover" key={application._id}>
      <td>{application.universityName}</td>
      <td>{application.scholarshipName}</td>
      <td>{application.scholarshipCategory}</td>
      <td>{application.subjectCategory}</td>
      <td>{application.applicantApplyingDegree}</td>
      <td>{application.applicationFees}</td>
      <td>{application.serviceCharge}</td>
      <td>{application.applyDate}</td>
      <td>{application.applicationDeadline}</td>
      <td>{application.applicationStatus}</td>
      <td className="flex gap-2">
        <button className="text-xl text-blue-500" title="Details" onClick={() => handleViewDetails(application)}><BiDetail /></button>
        <button className="text-xl text-yellow-500" title="Feedback" onClick={() => handleFeedback(application)}><RiFeedbackLine /></button>
        <button className={`text-xl ${application.applicationStatus === 'rejected' || application.applicationStatus === 'completed' ? 'text-gray-300' : 'text-green-500'} `} disabled={application.applicationStatus === 'rejected' || application.applicationStatus === 'completed'} title="Application Accept" onClick={() => handleAccept(application)}><MdOutlineDoneOutline /></button>
        <button className={`text-xl ${application.applicationStatus === 'rejected' || application.applicationStatus === 'completed' ? 'text-gray-300' : 'text-red-500'} `} disabled={application.applicationStatus === 'rejected' || application.applicationStatus === 'completed'} title="Cancel" onClick={() => handleCancel(application)}><MdCancel /></button>
      </td>
    </tr>
  );
};

AppliedScholarshipRow.propTypes = {
  application: PropTypes.object,
  allFunctions: PropTypes.object
};

export default AppliedScholarshipRow;