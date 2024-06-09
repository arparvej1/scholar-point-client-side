import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../provider/AuthProvider";
import './home.css';
import { ToastContainer, toast } from "react-toastify";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosArrowRoundForward } from "react-icons/io";
// --------------- Swiper Start ------------------------
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import axios from "axios";
import ScholarshipCard from "../AllScholarship/ScholarshipCard/ScholarshipCard";
import ScholarshipReviewDisplay from "../AllScholarship/ScholarshipReview/ScholarshipReviewDisplay";
// --------------- Swiper End ------------------------

const Home = () => {
  const { loginCheck } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const callLoadScholarships = async () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/scholarships`)
      .then(function (response) {
        // handle success
        setScholarships(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  };

  useEffect(() => {
    callLoadScholarships();
  }, []);

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);
  // ---------------- review start ---------------------
  const [reviews, setReviews] = useState([]);
  const loadReview = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_VERCEL_API}/reviews`);
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadReview();
  }, []);
  // ---------------- review end ---------------------

  const handleSubscribeEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    const subscribeEmail = form.subscribeEmail.value;
    const subscribeItem = { subscribeEmail }
    console.log(subscribeEmail);

    // --------- send server start -----
    axios.get(`${import.meta.env.VITE_VERCEL_API}/checkSubscriber?email=${subscribeEmail}`)
      .then(function (response) {
        console.log(response.data);
        if (!response.data.subscribed) {
          axios.post(`${import.meta.env.VITE_VERCEL_API}/subscriber`, subscribeItem)
            .then(function (response) {
              console.log(response.data);
              if (response.data.acknowledged) {
                Swal.fire({
                  title: 'Success!',
                  text: 'Thanks for Subscribed!',
                  icon: 'success',
                  confirmButtonText: 'Okay'
                })
              }
              form.reset();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else toast.warn('You are already subscribed!')
        form.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  }

  return (
    <div>
      <Helmet>
        <title> ScholarPoint </title>
      </Helmet>
      {/* ---------- slider banner start ------------ */}
      <div className='mb-10 mt-5 md:mt-8'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="mySwiper">
          {/* ----- slider 1 ---------- */}
          <SwiperSlide>
            <div className="w-full">
              <div className='relative'>
                <img src={`https://i.ibb.co/KzPcBX4/man1.jpg`} className="w-full lg:h-[600px]" />
                <div className='absolute md:top-32 md:left-32 lg:top-48 lg:left-48 text-white bg-[#00000071] p-10 rounded-2xl flex flex-col gap-3'>
                  <h3 className='text-3xl  font-medium '>book name</h3>
                  <h3 className='text-xl font-semibold'>Author: book.author</h3>
                  <div className="flex gap-2">
                    <BiSolidCategoryAlt className='text-2xl' />
                    <span>
                      book.category
                    </span>
                  </div>
                  <div className='max-w-96'>
                    <p>
                      book.shortDescription
                    </p>
                    <p>
                      <Link to={``} className='flex gap-1 items-center text-[#1266e3] font-semibold'><span>Continue</span> <IoIosArrowRoundForward className='text-3xl' /></Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* ------- slide 2 --------- */}
          <SwiperSlide>
            <div className="owl-item" style={{ width: 1110, marginRight: 70 }}>
              <div className="item">
                <div className="row align-items-center">
                  <div className="col-lg-6  order-xl-0 order-lg-0 order-1">
                    <div className="banner-inner-content">
                      <h4>
                        Discover New Horizons! <i className="fa-solid fa-earth-americas" />
                      </h4>
                      <h1>Embark on an Epic Journey!</h1>
                      <p className="font-size-20">
                        Explore new horizons and create unforgettable memories.
                      </p>
                      <div className="green-btn d-inline-block">
                        <a href="about.html" className="d-inline-block">
                          Explore Now
                        </a>
                      </div>
                      {/* banner inner content */}
                    </div>
                    {/*  */}
                  </div>
                  <div className="col-lg-6">
                    <figure className="banner-image-con">
                      <img
                        src="assets/images/home-banner-image.png"
                        alt="image"
                        className=""
                      />
                    </figure>
                    {/*  */}
                  </div>
                  {/* row */}
                </div>
                {/* item */}
              </div>
            </div>

          </SwiperSlide>
        </Swiper>
      </div>
      {/* ---------- slider banner End ------------ */}
      {/* ------------ scholarships card start ------------- */}
      <div className="my-5 md:my-10 lg:my-24">
        < h3 className="font-semibold md:mt-10 text-xl md:text-2xl lg:text-3xl text-base-content mx-auto text-center">Respectful Innovation: Shaping Our Scholarship Solutions</h3>
        <p className="my-5 md:my-8 text-center md:w-2/3 mx-auto">In our endeavor, we prioritize honoring expertise while crafting a revolutionary platform for accessing higher education funding. Through user-friendly interfaces and personalized recommendations, we empower students to navigate their educational journey with confidence and ease.</p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            scholarships.sort(function () { return 0.5 - Math.random() }).slice(0, 6).map(scholarship => <ScholarshipCard
              key={scholarship._id} scholarship={scholarship}
            ></ScholarshipCard>)
          }
        </div>
        {scholarships.length > 6 &&
          <div className="flex justify-center my-8">
            <Link to={`/all-scholarship`} className="btn bg-secondary text-secondary-content text-xl">All Scholarships</Link>
          </div>
        }
        <div>
          {
            loading &&
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        </div>
      </div>
      {/* ------------- scholarships card end -------------- */}
      {/* ---------- review section start --------- */}
      <div>
        {
          reviews.length > 0 &&
          <ScholarshipReviewDisplay
            reviews={reviews.sort(function () { return 0.5 - Math.random() }).slice(0, 6)}
          ></ScholarshipReviewDisplay>
        }
      </div>
      {/* ---------- review section end --------- */}
      {/* News Subscriber start */}
      <div className="my-5 md:my-10 lg:my-20">
        <p className="max-w-2xl text-center my-5 px-5 md:mt-10 lg:mt-24 mx-auto">
          Elevate your reading journey with BookSphere. Subscribe now for the latest updates and curated selections. Don't miss out!
        </p>
        <div className="max-w-96 px-5 mx-auto">
          <form onSubmit={handleSubscribeEmail} className="flex flex-col gap-5">
            <div>
              <label className="flex flex-col gap-1 w-full">
                <span></span>
                <input type="email" name="subscribeEmail" placeholder="Enter your email.." className="input input-bordered w-full" required />
              </label>
            </div>
            <div className="gap-5">
              <label className="flex flex-col gap-1 w-full">
                <input type="submit" value="Subscribe" className="btn bg-secondary text-secondary-content w-full" />
              </label>
            </div>
          </form>
        </div>
      </div>
      {/* News Subscriber end */}
      <ToastContainer />
    </div>
  );
};

export default Home;