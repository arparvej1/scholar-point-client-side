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
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import useUserPower from "../../../hooks/useUserPower";


const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, adminLoading, isAgent, agentLoading, isAgentOrAdmin, agentOrAdminLoading } = useUserPower();
  const [displayLayout, setDisplayLayout] = useState(localStorage.getItem('displayLayout') ? localStorage.getItem('displayLayout') : 'grid');

  // ----------------- pagination -----------------------
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const callScholarshipsCount = async () => {
    await axios.get(`${import.meta.env.VITE_VERCEL_API}/scholarshipsCount?filterText=${filterText}`)
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
    await axios.get(`${import.meta.env.VITE_VERCEL_API}/scholarshipsLimit?page=${currentPage}&size=${itemsPerPage}&filterText=${filterText}&input=${'University of Agriculture'}`)
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
  }, [currentPage, itemsPerPage, filterText]);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(0);
    const form = e.target;
    const searchText = form.searchField.value;
    console.log(searchText);
    setFilterText(searchText);
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

  const [manage, setManage] = useState(false);

  return (
    <div>
      <Helmet>
        <title> All Scholarships | ScholarPoint </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">All Scholarships </h3>
      {/* ----- filter start ----- */}
      <div className='my-6 text-center'>
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row justify-center gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" name="searchField" className="grow" placeholder="Search" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            <label className="flex flex-col gap-1">
              <input type="submit" value="Search" className="btn bg-primary text-primary-content" />
            </label>
          </div>
        </form>
      </div>
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
                      <td className="md:text-sm lg:text-base text-center">Image</td>
                      <td className="md:text-sm lg:text-base text-center">University<br />Name</td>
                      <td className="md:text-sm lg:text-base text-center">Address</td>
                      <td className="md:text-sm lg:text-base text-center">Scholarship<br />Name</td>
                      <td className="md:text-sm lg:text-base text-center">Scholarship<br />Category</td>
                      <td className="md:text-sm lg:text-base text-center">Degree</td>
                      <td className="md:text-sm lg:text-base text-center">Application<br />Deadline</td>
                      <td className="md:text-sm lg:text-base text-center">Application<br />Fees</td>
                      <td className="md:text-sm lg:text-base text-center">Details</td>
                      {
                        isAgentOrAdmin && manage ?
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
                        <td className="md:text-sm lg:text-base">
                          <img className="w-10" src={scholarship.universityLogo} alt="" />
                        </td>
                        <td className="md:text-sm lg:text-base">{scholarship.universityName}</td>
                        <td className="md:text-sm lg:text-base text-center">{scholarship.universityCity}, {scholarship.universityCountry}</td>
                        <td className="md:text-sm lg:text-base">{scholarship.scholarshipName}</td>
                        <td className="md:text-sm lg:text-base">{scholarship.scholarshipCategory}</td>
                        <td className="md:text-sm lg:text-base">{scholarship.degree}</td>
                        <td className="md:text-sm lg:text-base text-center">{scholarship.applicationDeadline}</td>
                        <td className="md:text-sm lg:text-base text-center">{scholarship.applicationFees}</td>
                        <td className="md:text-sm lg:text-base text-center"><Link to={`/scholarship/${scholarship._id}`} className="btn btn-link text-xl"><BiDetail title="View Details" /></Link></td>
                        {
                          isAgentOrAdmin && manage ?
                            <>
                              <td className="md:text-sm lg:text-base">
                                <Link to={`/dashboard/update-scholarship/${scholarship._id}`} className='btn btn-link text-xl text-center'><FiEdit title="Update scholarship" /></Link>
                              </td>
                              <td className="md:text-sm lg:text-base">
                                <button onClick={() => handleDelete(scholarship._id)} className='btn btn-link text-xl text-center'><RiDeleteBin2Fill title="Delete" />
                                </button>
                              </td>
                            </>
                            : undefined
                        }
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

export default AllScholarship;