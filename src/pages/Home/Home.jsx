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
      // console.log(response.data);
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
                <img src={`https://www.careerharvest.com.au/wp-content/uploads/2022/06/4.jpg`} className="w-full lg:h-[600px]" />
                <div className='absolute md:top-32 md:left-32 lg:top-48 lg:left-48 text-white bg-[#00000071] p-10 rounded-2xl flex flex-col gap-3'>
                  <h3 className='text-3xl  font-medium '>Global Agriculture Scholarship</h3>
                  <h3 className='text-xl font-semibold'>University of Agriculture</h3>
                  <div className="flex gap-2">
                    <BiSolidCategoryAlt className='text-2xl' />
                    <span>
                      Category: Agriculture
                    </span>
                  </div>
                  <div className='max-w-96'>
                    <p>
                    The University of Agriculture is pleased to announce the Global Agriculture Scholarship for the academic year 2024-2025. This prestigious scholarship is designed to support outstanding international students pursuing
                    </p>
                    <p>
                      <Link to={`/scholarship/665d5b298e72a8ec943199db`} className='flex gap-1 items-center text-white font-semibold'><span>Continue</span> <IoIosArrowRoundForward className='text-3xl' /></Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* ------- slide 2 --------- */}
          <SwiperSlide>
          <div className="w-full">
              <div className='relative'>
                <img src={`https://admissionscholarships.com/wp-content/uploads/2019/01/Scholarship-for-Economics-and-Finance.jpg`} className="w-full lg:h-[600px]" />
                <div className='absolute md:top-32 md:right-32 lg:top-48 lg:right-48 text-white bg-[#00000071] p-10 rounded-2xl flex flex-col gap-3'>
                  <h3 className='text-3xl  font-medium '>Economics and Finance Scholarship</h3>
                  <h3 className='text-xl font-semibold'>University of Pennsylvania</h3>
                  <div className="flex gap-2">
                    <BiSolidCategoryAlt className='text-2xl' />
                    <span>
                      Category: Agriculture
                    </span>
                  </div>
                  <div className='max-w-96'>
                    <p>
                    The Economics and Finance Scholarship at the University of Pennsylvania provides financial support to undergraduate students pursuing degrees in economics, 
                    </p>
                    <p>
                      <Link to={`/scholarship/665d5b868e72a8ec9432700b`} className='flex gap-1 items-center text-white font-semibold'><span>Continue</span> <IoIosArrowRoundForward className='text-3xl' /></Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* ----- slider 3 ---------- */}
          <SwiperSlide>
            <div className="w-full">
              <div className='relative'>
                <img src={`https://kenyapaediatric.org/wp-content/uploads/2024/01/KPFP-Advert-1080x675.jpg`} className="w-full lg:h-[600px]" />
                <div className='absolute md:top-32 md:right-32 lg:top-48 lg:right-48 text-white bg-[#00000071] p-10 rounded-2xl flex flex-col gap-3'>
                  <h3 className='text-3xl  font-medium '>Nursing Excellence Scholarship</h3>
                  <h3 className='text-xl font-semibold'>University of Melbourne</h3>
                  <div className="flex gap-2">
                    <BiSolidCategoryAlt className='text-2xl' />
                    <span>
                      Category: Agriculture
                    </span>
                  </div>
                  <div className='max-w-96'>
                    <p>
                    The Nursing Excellence Scholarship at the University of Melbourne is designed to support outstanding students pursuing nursing degrees. This scholarship recognizes academic excellence, dedication to the nursing profession, and a commitment to healthcare. 
                    </p>
                    <p>
                      <Link to={`/scholarship/665d5b298e72a8ec943199db`} className='flex gap-1 items-center text-white font-semibold'><span>Continue</span> <IoIosArrowRoundForward className='text-3xl' /></Link>
                    </p>
                  </div>
                </div>
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
          Elevate your scholarship journey with ScholarPoint. Subscribe now for the latest updates and curated resources. Don't miss out!
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