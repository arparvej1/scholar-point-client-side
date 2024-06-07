import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { MdCancel, MdOutlineRateReview } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import ReactStars from "react-rating-stars-component";

const MyApplicationCard = ({ application, handleCancelApplication }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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
    scholarshipId,
    _id
  } = application;
  
  const handleViewDetails = () => {
    navigate(`/dashboard/scholarship-apply-details/${_id}`)
  };

  const handleEditApplication = () => {
    if (!applicationStatus === 'pending') return toast.warn("Can't edit this application.")
    navigate(`/dashboard/scholarship-apply-edit/${_id}`)
  };

  // ---------------- review start ---------------------
  const [reviews, setReviews] = useState([]);
  const loadReview = () => {
    axiosSecure.get(`/reviewsFilter?scholarshipId=${scholarshipId}`)
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

  const handleAddReviewBtn = () => {
    if (reviews.find(review => review.reviewerEmail.toLowerCase() === user.email.toLowerCase())) {
      toast.warn('Already reviewed the scholarship!');
      return;
    }
    document.getElementById('addReviewModal').showModal();
  };

  const [reviewRating, setReviewRating] = useState(0);
  const [ratingMsg, setRatingMsg] = useState('');
  const ratingChanged = (newRating) => {
    setReviewRating(newRating);
    setRatingMsg('');
  };
  const [reviewOneTime, setReviewOneTime] = useState(true);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (reviewRating < 1) {
      return setRatingMsg('Please kindly provide a rating.');
    } else {
      setRatingMsg('');
    }

    if (!reviewOneTime) return;
    setReviewOneTime(false);

    const form = e.target;
    const comment = form.comment.value;
    const reviewDate = form.reviewDate.value;

    const completeReview = {
      reviewerImage: user.photoURL,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      scholarshipId: scholarshipId,
      reviewDate,
      rating: parseInt(reviewRating),
      comment
    };

    console.log(completeReview);
    // --------- send server start ----- 
    axiosSecure.post(`/reviews`, completeReview)
      .then(function (response) {
        console.log(response.data);
        if (response.data.acknowledged) {
          document.getElementById('addReviewModal').close();
          toast.success('Thanks for Review!');
          loadReview();
          form.reset();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  }
  // ---------------- review end ---------------------

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
      <td className='text-center text-lg'><button title='Cancel' onClick={() => handleCancelApplication(_id)}><MdCancel /></button></td>
      <td className='text-center text-lg'><button title='Add Review' onClick={handleAddReviewBtn}><MdOutlineRateReview /></button></td>
      {/* ---------- review modal add --------- */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="addReviewModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-center">Review</h3>
            <form
              onSubmit={handleAddReview}
              className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <label className="flex flex-col gap-1 w-full">
                  <span>Comment</span>
                  <textarea name="comment" placeholder="Write your review here" className="textarea textarea-bordered h-24 w-full" required ></textarea>
                </label>
                <label className="flex gap-1 w-full items-center">
                  <span>Rating: </span>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                </label>
                {ratingMsg && <p className="text-red-500">{ratingMsg}</p>}
                <label className="flex flex-col gap-1 w-full">
                  <span>Review Date</span>
                  <input type="date" name="reviewDate" value={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
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

MyApplicationCard.propTypes = {
  application: PropTypes.object.isRequired,
  handleCancelApplication: PropTypes.func,
};

export default MyApplicationCard;
