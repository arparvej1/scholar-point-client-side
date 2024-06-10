import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { MdCancel, MdOutlineRateReview } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    applicantFeedback,
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
  const loadReview = async () => {
    try {
      const response = await axiosSecure.get(`/myReviews/${user.email}`);
      // console.log('reviews', response.data);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadReview();
  }, []);

  const [thisScholarship, setThisScholarship] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/scholarship/${scholarshipId}`);
        setThisScholarship(res.data);
        // console.log('single scholarship', res.data);
      } catch (error) {
        console.error('Error fetching applied scholarships:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddReviewBtn = (id) => {
    // console.log('click scholarshipId', id);
    if (reviews.find(review => review.scholarshipId === id)) {
      toast.warn('Already reviewed the scholarship!');
      return;
    }
    document.getElementById(`addReviewModal${_id}`).showModal();
  };

  const [reviewRating, setReviewRating] = useState(0);
  const [ratingMsg, setRatingMsg] = useState('');
  const ratingChanged = (newRating) => {
    setReviewRating(newRating);
    setRatingMsg('');
  };
  const [reviewOneTime, setReviewOneTime] = useState(true);

  const handleAddReview = async (e) => {
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
      reviewDate,
      rating: parseInt(reviewRating),
      comment,
      scholarshipId: scholarshipId,
      universityName: thisScholarship.universityName,
      subjectCategory: thisScholarship.subjectCategory,
      scholarshipName: thisScholarship.scholarshipName
    };

    console.log(completeReview);
    // --------- send server start ----- 
    await axiosSecure.post(`/reviews`, completeReview)
      .then(function (response) {
        console.log(response.data);
        if (response.data.acknowledged) {
          document.getElementById(`addReviewModal${_id}`).close();
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
      <td>{applicantFeedback}</td>
      <td className='text-lg'>
        <div className='flex gap-3'>
          <button className='text-blue-600' title='Details' onClick={handleViewDetails}><BiDetail /></button>
          <button className={`${application.applicationStatus === 'rejected' || application.applicationStatus === 'completed' ? 'text-gray-300' : 'text-yellow-600'}`} title='Edit' disabled={application.applicationStatus === 'rejected' || application.applicationStatus === 'completed'} onClick={handleEditApplication}><FaRegEdit /></button>
          <button className={`${application.applicationStatus === 'rejected' || application.applicationStatus === 'completed' ? 'text-gray-300' : 'text-red-500'}`} title='Cancel' disabled={application.applicationStatus === 'rejected' || application.applicationStatus === 'completed'} onClick={() => handleCancelApplication(_id)}><MdCancel /></button>
        </div>
      </td>
      <td className='text-center text-lg'><button className='text-secondary' title='Add Review' onClick={() => handleAddReviewBtn(scholarshipId)}><MdOutlineRateReview /></button></td>
      {/* ---------- review modal add --------- */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id={`addReviewModal${_id}`} className="modal">
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
