import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import MyReviewCard from './MyReviewCard';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const response = await axiosSecure.get(`/myReviews/${user.email}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDeleteReview = async (_id) => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/review/${_id}`)
          .then(function (response) {
            // handle success
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your review has been deleted.',
                'success'
              )
              const remaining = reviews.filter(i => i._id !== _id);
              setReviews(remaining);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
    })
  };

  return (
    <div>
      <Helmet>
        <title> My Reviews | ScholarPoint </title>
      </Helmet>
      <h2 className="text-center p-3 my-3 md:my-0 bg-accent text-accent-content font-semibold rounded-xl text-lg md:text-xl lg:text-2xl">
        My Reviews
      </h2>
      <div className="overflow-x-auto m-3 border-2 p-3 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Comment</th>
              <th>Review Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <MyReviewCard
                key={review._id}
                review={review}
                handleDeleteReview={handleDeleteReview}
                loadReviews={loadReviews}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyReviews;
