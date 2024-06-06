import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  return (
    <div>
      <Helmet>
        <title> My Reviews | ScholarPoint </title>
      </Helmet>
      <h2 className='text-center p-3 my-3 md:my-0 bg-accent text-accent-content font-semibold rounded-xl text-lg md:text-xl lg:text-2xl'>My Reviews</h2>
    </div>
  );
};

export default MyReviews;