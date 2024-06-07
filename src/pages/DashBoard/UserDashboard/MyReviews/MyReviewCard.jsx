import PropTypes from 'prop-types';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const MyReviewCard = ({ review, handleDeleteReview }) => {
  
  const handleEditReview = () => {
    console.log('click edit');
  };

  return (
    <tr>
      <td>{review.scholarshipName}</td>
      <td>{review.universityName}</td>
      <td>{review.comment}</td>
      <td>{review.reviewDate}</td>
      <td className='text-lg'>
        <div className='flex gap-3'>
          <button className='text-yellow-600' title='Edit' onClick={handleEditReview}><FaRegEdit /></button>
          <button className='text-red-600' title='Delete' onClick={() => handleDeleteReview(review._id)}><MdDelete /></button>
        </div>
      </td>
    </tr>
  );
};

MyReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  handleDeleteReview: PropTypes.func.isRequired
};

export default MyReviewCard;
