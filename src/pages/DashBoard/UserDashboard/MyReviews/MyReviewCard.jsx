import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MyReviewCard = ({ review, handleDeleteReview, loadReviews }) => {
  const { _id, scholarshipName, universityName, comment, reviewDate, scholarshipId, reviewerImage, reviewerName, reviewerEmail, rating } = review;
  const axiosSecure = useAxiosSecure();

  // ---------------- review start ---------------------
  const handleEditReviewBtn = (_id) => {
    console.log('click edit');
    document.getElementById(`editReviewModal${_id}`).showModal();
  };

  const [reviewRating, setReviewRating] = useState(rating);
  const [ratingMsg, setRatingMsg] = useState('');
  const ratingChanged = (newRating) => {
    setReviewRating(newRating);
    setRatingMsg('');
  };

  const handleEditReview = async (e) => {
    e.preventDefault();
    if (reviewRating < 1) {
      return setRatingMsg('Please kindly provide a rating.');
    } else {
      setRatingMsg('');
    }

    const form = e.target;
    const comment = form.comment.value;
    const reviewDate = form.reviewDate.value;

    const completeReview = {
      new_reviewerImage: reviewerImage,
      new_reviewerName: reviewerName,
      new_reviewerEmail: reviewerEmail,
      new_reviewDate: reviewDate,
      new_rating: parseInt(reviewRating),
      new_comment: comment,
      new_scholarshipId: scholarshipId,
      new_universityName: universityName,
      new_scholarshipName: scholarshipName
    };

    console.log(completeReview);
    // --------- send server start ----- 
    await axiosSecure.put(`/review/${_id}`, completeReview)
      .then(function (response) {
        console.log(response.data);
        if (response.data.modifiedCount > 0) {
          document.getElementById(`editReviewModal${_id}`).close();
          toast.success('Update your review!');
          loadReviews();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  }
  // ---------------- review end ---------------------

  return (
    <tr>
      <td>{scholarshipName}</td>
      <td>{universityName}</td>
      <td>{comment}</td>
      <td>{reviewDate}</td>
      <td className='text-lg'>
        <div className='flex gap-3'>
          <button className='text-yellow-600' title='Edit' onClick={() => handleEditReviewBtn(_id)}><FaRegEdit /></button>
          <button className='text-red-600' title='Delete' onClick={() => handleDeleteReview(_id)}><MdDelete /></button>
        </div>
      </td>
      {/* ---------- review modal add --------- */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id={`editReviewModal${_id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-center">Review</h3>
            <form
              onSubmit={handleEditReview}
              className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <label className="flex flex-col gap-1 w-full">
                  <span>Comment</span>
                  <textarea name="comment" defaultValue={comment} placeholder="Write your review here" className="textarea textarea-bordered h-24 w-full" required ></textarea>
                </label>
                <label className="flex gap-1 w-full items-center">
                  <span>Rating: </span>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    value={rating}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                </label>
                {ratingMsg && <p className="text-red-500">{ratingMsg}</p>}
                <label className="flex flex-col gap-1 w-full">
                  <span>Review Date</span>
                  <input type="date" name="reviewDate" value={reviewDate} className="input input-bordered w-full" required />
                </label>
              </div>
              <div className="gap-5">
                <label className="flex flex-col gap-1 w-full">
                  <input type="submit" value="Submit" className="btn bg-secondary text-secondary-content w-full" />
                </label>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </tr>
  );
};

MyReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  handleDeleteReview: PropTypes.func.isRequired,
  loadReviews: PropTypes.func
};

export default MyReviewCard;
