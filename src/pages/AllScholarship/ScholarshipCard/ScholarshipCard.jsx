import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ScholarshipCard = ({ scholarship, activeAgent, handleDelete }) => {

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
    postedUserEmail,
    postedUserDisplayName
  } = scholarship;

  return (
    <div className='border-2 rounded-2xl p-5 flex flex-col justify-between'>
      <div className='col-span-1 space-y-3 my-5'>
        <h3 className='font-semibold text-2xl'>{universityName}</h3>
        <div className='flex justify-center items-center'>
          <img className='rounded-2xl' src={universityLogo} alt={universityName} />
        </div>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='font-semibold text-2xl'>{scholarshipCategory}</h3>
          <p><span className='font-semibold'>Address:</span> {universityCity}, {universityCountry}</p>
          <p><span className='font-semibold'>Application Deadline:</span> {applicationDeadline}</p>
          <p><span className='font-semibold'>Subject Category:</span> {subjectCategory}</p>
          <p><span className='font-semibold'>Application Fees:</span> {applicationFees}</p>
          {/* -- TODO: Update rating -- */}
          <p><span className='font-semibold'>Rating:</span> 4.6</p>

        </div>
      </div>
      <div className='flex gap-5 justify-center'>
        {
          activeAgent ? <>
            <Link to={`/update-scholarship/${_id}`} className='btn bg-accent text-accent-content'>Update</Link>
            <button onClick={() => handleDelete(_id)} className='btn bg-secondary text-secondary-content'>Delete</button>
          </>
            : undefined
        }
        <Link to={`/scholarship/${_id}`} className={`btn bg-primary text-primary-content ${!activeAgent ? 'w-full' : undefined}`}> {!activeAgent ? 'View' : undefined} Details</Link>
      </div>
    </div>
  );
};

ScholarshipCard.propTypes = {
  scholarship: PropTypes.object,
  activeAgent: PropTypes.bool,
  handleDelete: PropTypes.func
};

export default ScholarshipCard;