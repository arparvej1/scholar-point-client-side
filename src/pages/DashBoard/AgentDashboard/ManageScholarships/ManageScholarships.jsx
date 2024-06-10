import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { BiDetail } from "react-icons/bi";
import useUserPower from "../../../../hooks/useUserPower";
import ScholarshipCard from "../../../AllScholarship/ScholarshipCard/ScholarshipCard";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const { isAdmin, adminLoading, isAgent, agentLoading, isAgentOrAdmin, agentOrAdminLoading } = useUserPower();
  const [displayLayout, setDisplayLayout] = useState(localStorage.getItem('displayLayout') ? localStorage.getItem('displayLayout') : 'grid');

  // ----------------- pagination -----------------------
  const [filterQty, setFilterQty] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const callScholarshipsCount = async () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/scholarshipsCount?filterQty=${filterQty}`)
      .then(function (response) {
        // handle success
        setCount(response.data.count)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  };

  const callLoadScholarships = async () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/scholarshipsLimit?page=${currentPage}&size=${itemsPerPage}&filterQty=${filterQty}`)
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
    callScholarshipsCount();
    callLoadScholarships();
  }, [currentPage, itemsPerPage, filterQty]);

  const handleItemsPerPage = e => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemsPerPage(val);
    setCurrentPage(0);
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  // ------------------- pagination end ------------------

  useEffect(() => {
    localStorage.setItem('displayLayout', displayLayout);
    const localDisplayLayout = localStorage.getItem('displayLayout');
    setDisplayLayout(localDisplayLayout);
  }, [displayLayout])

  const handleDisplayLayoutBtn = (layout) => {
    if (layout === 'grid') {
      setDisplayLayout('grid')
    } else {
      setDisplayLayout('list')
    }
  }

  const handleFilter = async (filterBy) => {
    setCurrentPage(0);
    if (filterBy === 'All') {
      setFilterQty(2);
    } else if (filterBy === 'Available') {
      setFilterQty(1);
    } else if (filterBy === 'Not') {
      setFilterQty(0);
    }
  }

  const handleDelete = _id => {
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
        axios.delete(`${import.meta.env.VITE_VERCEL_API}/scholarship/${_id}`)
          .then(function (response) {
            // handle success
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
              )
              const remaining = scholarships.filter(i => i._id !== _id);
              setScholarships(remaining);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // -------------- update start ------
  const handleUpdateBtn = (id) => {
    console.log(id);
    document.getElementById(`updateScholarshipModal${id}`).showModal();
  };

  const uploadImage_imgbb = async (uploadImage) => {
    const data = uploadImage.files[0];
    console.log(data)
    // image upload to imgbb and then get an url
    const imageFile = { image: data }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (!res.data.success) {
      return false
    }
    // console.log('with image url', res.data);
    return res.data.data.display_url;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    let new_universityLogo = form.universityLogo.value;
    let universityLogo = '';
    const uploadImage = e.target.universityLogoNew;
    if (uploadImage.files[0]) {
      universityLogo = await uploadImage_imgbb(uploadImage);
    }
    if (!universityLogo) {
      new_universityLogo = form.universityLogo.value;
    } else {
      new_universityLogo = universityLogo;
    }

    const id = form.scholarshipId.value;
    const new_scholarshipName = form.scholarshipName.value;
    const new_universityName = form.universityName.value;
    const new_universityCountry = form.universityCountry.value;
    const new_universityCity = form.universityCity.value;
    const new_universityRank = form.universityRank.value;
    const new_subjectCategory = form.subjectCategory.value;
    const new_scholarshipCategory = form.scholarshipCategory.value;
    const new_degree = form.degree.value;
    const new_tuitionFees = form.tuitionFees.value;
    const new_applicationFees = form.applicationFees.value;
    const new_serviceCharge = form.serviceCharge.value;
    const new_applicationDeadline = form.applicationDeadline.value;
    const new_scholarshipPostDate = form.scholarshipPostDate.value;
    const new_scholarshipDescription = form.scholarshipDescription.value;
    const new_postedUserEmail = user.email;
    const new_postedUserDisplayName = user.displayName;

    const completeItem = {
      new_scholarshipName,
      new_universityName,
      new_universityLogo,
      new_universityCountry,
      new_universityCity,
      new_universityRank: parseInt(new_universityRank),
      new_subjectCategory,
      new_scholarshipCategory,
      new_degree,
      new_tuitionFees: parseInt(new_tuitionFees),
      new_applicationFees: parseInt(new_applicationFees),
      new_serviceCharge: parseInt(new_serviceCharge),
      new_applicationDeadline,
      new_scholarshipPostDate,
      new_scholarshipDescription,
      new_postedUserEmail,
      new_postedUserDisplayName
    }

    console.log(completeItem);

    // --------- send server start -----
    axios.put(`${import.meta.env.VITE_VERCEL_API}/scholarship/${id}`, completeItem)
      .then(function (response) {
        console.log(response.data);
        if (response.data.modifiedCount) {
          Swal.fire({
            title: 'Success!',
            text: 'Successfully Update Scholarship!',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
          callLoadScholarships();
          document.getElementById(`updateScholarshipModal${id}`).close();
        }
        // form.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  };
  // -------------- update end ------

  return (
    <div>
      <Helmet>
        <title> Manage Scholarships | ScholarPoint </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">Manage Scholarships </h3>
      {/* ----- filter start ----- */}
      {/* <div className='my-6 text-center'>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 bg-[#23BE0A] hover:bg-[#22be0ac5] text-white w-52">Filter By <IoIosArrowDown className='text-2xl' />
          </div>
          <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
            <li className={`${filterQty === 2 ? 'bg-accent text-accent-content rounded-xl' : undefined}`}><Link onClick={() => handleFilter('All')}>Show all scholarships</Link></li>
            <li className={`${filterQty === 1 ? 'bg-accent text-accent-content rounded-xl' : undefined}`}><Link onClick={() => handleFilter('Available')}>Show available scholarships</Link></li>
            <li className={`${filterQty === 0 ? 'bg-accent text-accent-content rounded-xl' : undefined}`}><Link onClick={() => handleFilter('Not')}>Not Available</Link></li>
          </ul>
        </div>
      </div> */}
      {/* ----- filter end ----- */}
      {/* ------------------------- all scholarships display start ------------------ */}
      <div>
        <div className="flex justify-end items-center gap-2 my-5">
          <p className="font-semibold md:text-xl">Display Layout</p>
          <div>
            <span onClick={() => handleDisplayLayoutBtn('list')}
              className={`btn rounded-l-2xl rounded-r-none text-xl md:text-2xl ${displayLayout === 'list' ? 'bg-accent bg-opacity-50' : ''}`}><FaList /></span>
            <span onClick={() => handleDisplayLayoutBtn('grid')}
              className={`btn rounded-l-none rounded-r-2xl text-xl md:text-2xl ${displayLayout === 'grid' ? 'bg-accent bg-opacity-50' : ''}`}><IoGrid /></span>
          </div>
        </div>
        {/* --------------------- display view ------------------------- */}
        {
          displayLayout === 'list' ?
            <div className="max-w-4xl mx-auto">
              {/* scholarships display list view */}
              <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                      <th></th>
                      {/* <td className="md:text-sm lg:text-base text-center">Image</td> */}
                      <td className="md:text-sm lg:text-base text-center">Scholarship<br />Name</td>
                      <td className="md:text-sm lg:text-base text-center">University<br />Name</td>
                      <td className="md:text-sm lg:text-base text-center">Subject<br />Category</td>
                      {/* <td className="md:text-sm lg:text-base text-center">Address</td> */}
                      <td className="md:text-sm lg:text-base text-center">Applied<br />Degree</td>
                      <td className="md:text-sm lg:text-base text-center">Application<br />Fees</td>
                      <td className="md:text-sm lg:text-base text-center">Details</td>
                      {
                        isAgentOrAdmin ?
                          <>
                            <td className="md:text-sm lg:text-base text-center">Update</td>
                            <td className="md:text-sm lg:text-base text-center">Delete</td>
                          </>
                          : undefined
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      scholarships.map((scholarship, idx) => <tr key={scholarship._id} className="md:text-sm lg:text-base">
                        <th className="md:text-sm lg:text-base">{(currentPage * itemsPerPage) + idx + 1}</th>
                        {/* <td className="md:text-sm lg:text-base">
                          <img className="w-10" src={scholarship.universityLogo} alt="" />
                        </td> */}
                        <td className="md:text-sm lg:text-base">{scholarship.scholarshipName}</td>
                        <td className="md:text-sm lg:text-base">{scholarship.universityName}</td>
                        <td className="md:text-sm lg:text-base">{scholarship.subjectCategory}</td>
                        {/* <td className="md:text-sm lg:text-base text-center">{scholarship.universityCity}, {scholarship.universityCountry}</td> */}
                        <td className="md:text-sm lg:text-base text-center">{scholarship.degree}</td>
                        <td className="md:text-sm lg:text-base text-center">{scholarship.applicationFees}</td>
                        <td className="md:text-sm lg:text-base text-center"><Link to={`/scholarship/${scholarship._id}`} className="btn btn-link text-xl"><BiDetail title="View Details" /></Link></td>
                        {
                          isAgentOrAdmin &&
                          <>
                            <td className="md:text-sm lg:text-base">
                              {/* <Link to={`/dashboard/update-scholarship/${scholarship._id}`} className='btn btn-link text-xl text-center'><FiEdit title="Update scholarship" /></Link> */}
                              <Link onClick={() => handleUpdateBtn(scholarship._id)} className='btn btn-link text-xl text-center text-yellow-600'><FiEdit title="Update scholarship" /></Link>
                            </td>
                            <td className="md:text-sm lg:text-base">
                              <button onClick={() => handleDelete(scholarship._id)} className='btn btn-link text-xl text-center text-red-500'><RiDeleteBin2Fill title="Delete" />
                              </button>
                            </td>
                          </>
                        }
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
                                      <span>University Logo ("If no new logo is chosen, the old one stays.")</span>
                                      <input type="file" name="universityLogoNew" className="file-input file-input-bordered w-full max-w-xs" />
                                      <input type="text" name="universityLogo" defaultValue={scholarship.universityLogo} placeholder="University Logo" className="input input-bordered w-full hidden" required />
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
                      </tr>)
                    }
                  </tbody>
                </table>
              </div>
            </div>
            :
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* scholarships display card view */}
              {
                scholarships.map(scholarship => <ScholarshipCard
                  key={scholarship._id}
                  scholarship={scholarship}
                  scholarships={scholarships}
                  setScholarships={setScholarships}
                  isAgentOrAdmin={isAgentOrAdmin}
                  handleDelete={handleDelete}
                  manage={true}
                  handleUpdateBtn={handleUpdateBtn}
                  handleUpdate={handleUpdate}
                ></ScholarshipCard>)
              }
            </div>
        }
        {
          loading &&
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      </div>
      {/* ------------------------- all scholarships display end ------------------ */}
      <div className='text-center my-10'>
        <p className="mb-8 font-semibold">Current page: {currentPage + 1}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="btn" onClick={handlePrevPage}>Prev</button>
          {
            pages.map(page => <button
              // className={currentPage === page ? 'selected' : undefined}
              className={`btn ${currentPage === page ? 'bg-accent text-accent-content' : undefined}`}
              onClick={() => setCurrentPage(page)}
              key={page}
            >{page + 1}</button>)
          }
          <button className="btn" onClick={handleNextPage}>Next</button>
          <select className="btn bg-base-100 border-2 text-base-content w-20" value={itemsPerPage} onChange={handleItemsPerPage}>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageScholarships;