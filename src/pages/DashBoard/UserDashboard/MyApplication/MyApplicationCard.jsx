import PropTypes from 'prop-types';
import { BiDetail } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { MdCancel, MdOutlineRateReview } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const MyApplicationCard = ({ application, handleCancelApplication }) => {
  const navigate = useNavigate();
  const {
    universityName,
    applicantAddressCountry,
    applicantAddressDistrict,
    applicantAddressVillage,
    subjectCategory,
    applicantApplyingDegree,
    applicationFees,
    serviceCharge,
    applicationStatus,
    _id
  } = application;

  const handleViewDetails = () => {
    navigate(`/dashboard/scholarship-apply-details/${_id}`)
  };

  const handleEditApplication = () => {
    // Implement edit application logic
    navigate(`/dashboard/scholarship-apply-edit/${_id}`)
  };

  const handleAddReview = () => {
    // Implement add review logic
  };

  return (
    <tr key={_id} className="hover">
      <td>{universityName}</td>
      <td>{`${applicantAddressVillage}, ${applicantAddressDistrict}, ${applicantAddressCountry}`}</td>
      <td>{subjectCategory}</td>
      <td>{applicantApplyingDegree}</td>
      <td>{applicationFees}</td>
      <td>{serviceCharge}</td>
      <td>{applicationStatus}</td>
      <td className='text-center text-lg'><button title='Details' onClick={handleViewDetails}><BiDetail /></button></td>
      <td className='text-center text-lg'><button title='Edit' onClick={handleEditApplication}><FaRegEdit /></button></td>
      <td className='text-center text-lg'><button title='Add Review' onClick={handleAddReview}><MdOutlineRateReview /></button></td>
      <td className='text-center text-lg'><button title='Cancel' onClick={() => handleCancelApplication(_id)}><MdCancel /></button></td>
    </tr>
  );
};

MyApplicationCard.propTypes = {
  application: PropTypes.object.isRequired,
  handleCancelApplication: PropTypes.func,
};

export default MyApplicationCard;
