import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from 'react';
import axios from 'axios';

const ScholarshipCard = ({ scholarship, isAgentOrAdmin, handleDelete, manage, handleUpdateBtn, handleUpdate }) => {
  const { user } = useAuth();
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
    postedUserEmail,
    postedUserDisplayName
  } = scholarship;
  // ----------- rating start -------------
  const [rating, setRating] = useState(0);
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / reviews.length;
  };
  const loadReview = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_VERCEL_API}/reviewsFilter?scholarshipId=${_id}`);
      console.log(response.data);
      const reviews = response.data;
      const averageRating = calculateAverageRating(reviews);
      setRating(averageRating);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadReview();
  }, []);
  // ----------- rating end -------------
  return (
    <div className='border-2 rounded-2xl p-5 flex flex-col justify-between'>
      <div className='col-span-1 space-y-3 my-5'>
        <h3 className='font-semibold text-2xl'>{universityName}</h3>
        <div className='flex justify-center items-center'>
          <img className='rounded-2xl' src={universityLogo} alt={universityName} />
        </div>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='font-semibold text-2xl'>{scholarshipCategory}</h3>
          <p><span className='font-semibold'>Address:</span> {universityCity}, {universityCountry}</p>
          <p><span className='font-semibold'>Scholarship Name:</span> {scholarshipName}</p>
          <p><span className='font-semibold'>Degree:</span> {degree}</p>
          <p><span className='font-semibold'>Application Deadline:</span> {applicationDeadline}</p>
          <p><span className='font-semibold'>Subject Category:</span> {subjectCategory}</p>
          <p><span className='font-semibold'>Application Fees:</span> {applicationFees}</p>
          {/* -- TODO: Update rating -- */}
          {rating ?
            <p>
              <label className="flex gap-1 w-full items-center">
                <span>Rating: </span>
                <ReactStars
                  size={24}
                  activeColor="#ffd700"
                  value={rating}
                  edit={false}
                />
              </label>
            </p>
            :<></>}
        </div>
      </div>
      <div className="flex gap-5 justify-center">
        {
          isAgentOrAdmin && manage ? <>
            <Link onClick={() => handleUpdateBtn(_id)} className='btn bg-accent text-accent-content'>Update</Link>
            {/* <Link to={`/dashboard/update-scholarship/${_id}`} className='btn bg-accent text-accent-content'>Update</Link> */}
            <button onClick={() => handleDelete(_id)} className='btn bg-secondary text-secondary-content'>Delete</button>
          </>
            : undefined
        }
        <Link to={`/scholarship/${_id}`} className={`btn bg-primary text-primary-content ${!isAgentOrAdmin || !manage ? 'w-full' : undefined}`}> {!isAgentOrAdmin || !manage ? 'View' : undefined} Details</Link>

        {/* ---------- scholarship modal add --------- */}
        <div>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <dialog id={`updateScholarshipModal${scholarship._id}`} className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              {/* <h3 className="font-bold text-lg text-center">Scholarship Update</h3> */}
              <div className="max-w-4xl mx-auto mt-5 bg-accent text-accent-content p-5 md:p-8 lg:p-10 rounded-xl">
                <h3 className="text-2xl md:text-3xl text-center mb-6 font-semibold mx-auto">Update Scholarship</h3>
                <form
                  onSubmit={handleUpdate}
                  className="flex flex-col gap-5">
                  <div className="gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>Scholarship Name</span>
                      <input type="text" name="scholarshipId" value={scholarship._id} placeholder="Scholarship Id" className="input input-bordered w-full hidden" required />
                      <input type="text" name="scholarshipName" defaultValue={scholarship.scholarshipName} placeholder="Scholarship Name" className="input input-bordered w-full" required />
                    </label>
                  </div>
                  <div className="gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>University Name</span>
                      <input type="text" name="universityName" defaultValue={scholarship.universityName} placeholder="University Name" className="input input-bordered w-full" required />
                    </label>
                  </div>
                  <div className="gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>University Logo</span>
                      <input type="text" name="universityLogo" defaultValue={scholarship.universityLogo} placeholder="University Logo" className="input input-bordered w-full" required />
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>University Country</span>
                      <input type="text" name="universityCountry" defaultValue={scholarship.universityCountry} placeholder="University Country" className="input input-bordered w-full" required />
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span>University City</span>
                      <input type="text" name="universityCity" defaultValue={scholarship.universityCity} placeholder="University City" className="input input-bordered w-full" required />
                    </label>
                  </div>
                  <div className="gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>University Rank</span>
                      <input type="text" name="universityRank" defaultValue={scholarship.universityRank} placeholder="University Rank" className="input input-bordered w-full" required />
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>Subject Category</span>
                      <div className="flex gap-1">
                        <select name="subjectCategory" className="select select-bordered w-full">
                          <option selected={scholarship.subjectCategory === 'Agriculture'} value="Agriculture">Agriculture</option>
                          <option selected={scholarship.subjectCategory === 'Engineering'} value="Engineering">Engineering</option>
                          <option selected={scholarship.subjectCategory === 'Doctor'} value="Doctor">Doctor</option>
                        </select>
                      </div>
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span>Scholarship Category</span>
                      <div className="flex gap-1">
                        <select name="scholarshipCategory" className="select select-bordered w-full">
                          <option selected={scholarship.scholarshipCategory === 'Full fund'} value="Full fund">Full fund</option>
                          <option selected={scholarship.scholarshipCategory === 'Partial'} value="Partial">Partial</option>
                          <option selected={scholarship.scholarshipCategory === 'Self-fund'} value="Self-fund">Self-fund</option>
                        </select>
                      </div>
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>Degree</span>
                      <div className="flex gap-1">
                        <select name="degree" className="select select-bordered w-full">
                          <option selected={scholarship.degree === 'Diploma'} value="Diploma">Diploma</option>
                          <option selected={scholarship.degree === 'Bachelor'} value="Bachelor">Bachelor</option>
                          <option selected={scholarship.degree === 'Masters'} value="Masters">Masters</option>
                        </select>
                      </div>
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span>Tuition Fees</span>
                      <input type="text" name="tuitionFees" defaultValue={scholarship.tuitionFees} placeholder="Tuition Fees" className="input input-bordered w-full" />
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>Application Fees</span>
                      <input type="text" name="applicationFees" defaultValue={scholarship.applicationFees} placeholder="Application Fees" className="input input-bordered w-full" />
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span>Service Charge</span>
                      <input type="text" name="serviceCharge" defaultValue={scholarship.serviceCharge} placeholder="Service Charge" className="input input-bordered w-full" />
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>Scholarship Post Date</span>
                      <input type="date" name="scholarshipPostDate" defaultValue={scholarship.scholarshipPostDate} value={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span>Application Deadline</span>
                      <input type="date" name="applicationDeadline" defaultValue={scholarship.applicationDeadline} min={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
                    </label>
                  </div>
                  <div className="gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <span>Scholarship Description</span>
                      <textarea name="scholarshipDescription" defaultValue={scholarship.scholarshipDescription} placeholder="Scholarship Description" className="textarea textarea-bordered h-24 w-full" required ></textarea>
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5 border-[2px] p-4 border-info">
                    <label className="flex flex-col gap-1 w-full">
                      <span>User Name</span>
                      <input type="text" name="postedUserEmail" value={user?.displayName} placeholder="User Name" className="input input-bordered text-base-content bg-base-200 w-full" />
                    </label>
                    <label className="flex flex-col gap-1 w-full">
                      <span>User Email</span>
                      <input type="text" name="postedUserDisplayName" value={user?.email} placeholder="User Email" className="input input-bordered text-base-content bg-base-200 w-full" />
                    </label>
                  </div>
                  <div className="gap-5">
                    <label className="flex flex-col gap-1 w-full">
                      <input type="submit" value="Update Scholarship" className="btn bg-secondary text-secondary-content w-full" />
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

ScholarshipCard.propTypes = {
  scholarship: PropTypes.object,
  isAgentOrAdmin: PropTypes.bool,
  manage: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleUpdateBtn: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default ScholarshipCard;