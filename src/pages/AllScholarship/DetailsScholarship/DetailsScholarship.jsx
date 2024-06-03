import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import ReactStars from "react-rating-stars-component";
import ScholarshipReviewDisplay from "../ScholarshipReview/ScholarshipReviewDisplay";

const DetailsScholarship = () => {
  const { user } = useContext(AuthContext);
  const scholarship = useLoaderData();
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
    scholarshipDescription,
    postedUserEmail,
    postedUserDisplayName
  } = scholarship;

  const handleApplyScholarship = () => {
    console.log('handleApplyScholarship', scholarship);
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(reviews);
  }, []);

  const handleAddReviewBtn = () => {
    // if (currentStock <= 0) {
    //   toast.warn('No stock available!')
    //   return;
    // }
    // if (borrowList.find(borrow => borrow.borrowBookId.includes(_id) && borrow.borrowEmail.includes(user.email))) {
    //   toast.warn('Already borrowed the book!');
    //   return;
    // } else if (borrowList.filter(borrow => borrow.borrowEmail.includes(user.email)).length >= 3) {
    //   toast.warn('Maximum number of books borrowed!');
    //   return;
    // }
    document.getElementById('addReviewModal').showModal();
  };

  const [reviewRating, setReviewRating] = useState(0);
  const [ratingMsg, setRatingMsg] = useState('');
  const ratingChanged = (newRating) => {
    setReviewRating(newRating);
    setRatingMsg('');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    // if (borrowList.find(borrow => borrow.borrowBookId.includes(_id) && borrow.borrowEmail.includes(user.email))) {
    //   toast.warn('Already borrowed the book!');
    //   return;
    // }
    // if (!bookBorrowOneTime) return;
    // setBookBorrowOneTime(false);

    if (reviewRating < 1) {
      return setRatingMsg('Please kindly provide a rating.');
    } else {
      setRatingMsg('');
    }

    const form = e.target;
    const comment = form.comment.value;
    const reviewDate = form.reviewDate.value;

    const completeReview = {
      reviewerImage: user.photoURL,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      scholarshipId: _id,
      reviewDate,
      rating: parseInt(reviewRating),
      comment
    };

    console.log(completeReview);
    // --------- send server start ----- 
    axios.post(`${import.meta.env.VITE_VERCEL_API}/reviews`, completeReview)
      .then(function (response) {
        console.log(response.data);
        if (response.data.acknowledged) {
          // updateStock();
          document.getElementById('addReviewModal').close();
          toast.success('Thanks for Review!');
        }
        // form.reset();
        // loadBorrow();
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  }

  return (
    <>
      <Helmet>
        <title> {scholarshipName} | ScholarPoint </title>
      </Helmet>
      {/* ---------------- scholarship details ------------------- */}
      <div>
        <div className="flex flex-col md:flex-row gap-12 mt-10 justify-center">
          <div className="bg-base-300 rounded-3xl p-16 flex justify-center">
            <img className="max-h-48" src={universityLogo} alt={universityName} />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-4xl">{universityName}</h3>
            <hr />
            <p className="text-justify"><span className="font-bold">University Rank:</span> {universityRank}</p>
            <p className="text-justify"><span className="font-bold">University Address:</span> {universityCity}, {universityCountry}</p>
            <p className="text-justify"><span className="font-bold">Tuition Fees:</span> {tuitionFees}</p>
            <p className="text-justify"><span className="font-bold">Degree:</span> {degree}</p>
            <hr />
            <div className="flex flex-wrap gap-3">
              <button onClick={handleApplyScholarship} className="btn bg-secondary text-secondary-content hover:bg-primary border-gray-500 px-6">Apply Scholarship</button>
              <button onClick={handleAddReviewBtn} className="btn bg-accent text-accent-content hover:bg-primary border-gray-500 px-6">Add Review</button>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-4xl">{scholarshipName}</h3>
          <p className="text-justify"><span className="font-bold">Scholarship Category:</span> {scholarshipCategory}</p>
          <p className="text-justify"><span className="font-bold">Application Deadline:</span> {applicationDeadline}</p>
          <p className="text-justify"><span className="font-bold">Subject Category:</span> {subjectCategory}</p>
          {/* TODO: <p className="text-justify"><span className="font-bold">Stipend:</span> {Stipend}</p> */}
          <p className="text-justify"><span className="font-bold">Post Date:</span> {scholarshipPostDate}</p>
          <p className="text-justify"><span className="font-bold">Service Charge:</span> {serviceCharge}</p>
          <p className="text-justify"><span className="font-bold">Application Fees:</span> {applicationFees}</p>
          <p className="text-justify"><span className="font-bold">Scholarship Description:</span> {scholarshipDescription}</p>
          <hr />
          <div>
          </div>
        </div>
      </div>
      {/* ---------- modal category add --------- */}
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
                  {ratingMsg && <p className="text-red-500">{ratingMsg}</p>}
                </label>
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
          <ToastContainer />
        </dialog>
      </div>
      <div>
        <ScholarshipReviewDisplay
          currentScholarshipId={_id}
        ></ScholarshipReviewDisplay>
      </div>
      <ToastContainer />
    </>
  );
};

export default DetailsScholarship;