import PropTypes from 'prop-types';
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review, onDelete }) => {
  const { _id, scholarshipName, universityName, comment, reviewDate, scholarshipId, reviewerImage, reviewerName, reviewerEmail, rating, subjectCategory } = review;

  return (
    <div className="col-md-4 mb-4 border-2 shadow-lg rounded-lg">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{universityName}</h5>
          <div className='flex justify-center'>
            <div className='border-2 rounded-full'>
              <img className="w-32 h-32 rounded-full p-2" src={review.reviewerImage} />
            </div>
          </div>
          <div className="text-center divider mx-auto">{reviewerName}</div>
          Subject Category: {subjectCategory}<br />
          <p className="card-text">
            Review Date: {new Date(reviewDate).toLocaleDateString()}<br />
            <label className="flex gap-1 w-full items-center">
              <span>Rating: </span>
              <ReactStars
                size={24}
                activeColor="#ffd700"
                value={rating}
                edit={false}
              />
            </label>
            Reviewer Comments: {comment}
          </p>
          <button className="btn bg-secondary text-secondary-content font-semibold" onClick={() => onDelete(_id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default ReviewCard;
