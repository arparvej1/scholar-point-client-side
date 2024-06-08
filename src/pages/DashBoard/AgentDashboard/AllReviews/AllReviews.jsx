import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ReviewCard from "./ReviewCard";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const response = await axiosSecure.get(`/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // --------- send server start -----
        axiosSecure.delete(`/review/${reviewId}`)
          .then(function (response) {
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              loadReviews();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review deleted successfully.",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // --------- send server end -----
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title> All Reviews | ScholarPoint </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">All Reviews</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} onDelete={handleDeleteReview} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;