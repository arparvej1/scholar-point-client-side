import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../provider/AuthProvider";
import './home.css';
import { ToastContainer } from "react-toastify";
// --------------- Swiper End ------------------------

const Home = () => {
  const { loginCheck } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    // loginCheck();
  }, []);

  return (
    <div>
      <Helmet>
        <title> ScholarPoint </title>
      </Helmet>
      {/* ---------- slider banner start ------------ */}
      <div className='mb-10 mt-5 md:mt-8'>
        Hello ScholarPoint!
      </div>
      {/* ---------- slider banner End ------------ */}
      <ToastContainer />
    </div>
  );
};

export default Home;