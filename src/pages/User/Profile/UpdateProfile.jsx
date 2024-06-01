import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../provider/AuthProvider';

const UpdateProfile = () => {
  const { user, updateUserInfo, setLoading, setAvatarIcon, setAlreadyUpdate, loginCheck } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo_url = e.target.photo_url.value;

    // create user in firebase
    updateUserInfo(user, name, photo_url)
      .then(() => {
        console.log('click Update');
        setLoading(false);
        navigate('/profile');
        setAlreadyUpdate(true);
        setAvatarIcon(true);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(user);
  }

  return (
    <div className='md:4/5 lg:w-2/3 mx-auto'>
      <Helmet>
        <title> Update Profile | ScholarPoint </title>
      </Helmet>
      <div className='flex flex-col gap-3'>
        <h3 className='font-bold text-4xl'>My Profile</h3>
        <div className='flex flex-col md:flex-row items-center gap-5 bg-base-200 p-8 rounded-xl'>
          <div className=''>
            <img className='w-32 h-32 rounded-full' src={user.photoURL || "https://i.ibb.co/ZT5tByN/avatar-15-blue.jpg"} alt={user.displayName} />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold'>{user.displayName}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        {/* ----- Personal Information ------ */}
        <div className='flex flex-col gap-3 md:gap-5 bg-base-200 p-6 md:p-8 rounded-xl rounded-tl-none'>
          <h3 className='font-semibold text-xl md:text-2xl underline'>Personal Information</h3>
          <form onSubmit={handleUpdateUser} className='flex flex-col gap-3 '>
            <div>
              <span>Full Name:</span>
              <input type="text" name='name' defaultValue={user.displayName} placeholder="Full Name" className="input input-bordered w-full" />
            </div>
            <div>
              <span>Photo URL:</span>
              <input type="text" name='photo_url' defaultValue={user.photoURL} placeholder="Photo URL" className="input input-bordered w-full" />
            </div>
            <div>
              <input type="submit" value='Update Information' className="btn btn-primary w-full font-semibold text-xl" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;