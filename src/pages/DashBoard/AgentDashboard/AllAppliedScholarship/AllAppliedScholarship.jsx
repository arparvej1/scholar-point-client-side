import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import AppliedScholarshipRow from "./AppliedScholarshipRow";
import Swal from "sweetalert2";

const AllAppliedScholarship = () => {
  const { user } = useAuth();
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const loadAppliedScholarships = async () => {
    try {
      const response = await axiosSecure.get(`/allScholarshipApply/${user.email}`);
      setAppliedScholarships(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applied scholarships:", error);
    }
  };
  useEffect(() => {
    loadAppliedScholarships();
  }, []);

  const [selectedApplication, setSelectedApplication] = useState([]);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    document.getElementById(`detailsViewModal${selectedApplication?._id}`).showModal();
  };

  const handleCancel = (application) => {
    const new_applicationStatus = {
      new_applicationStatus: 'rejected',
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // --------- send server start -----
        axiosSecure.patch(`/scholarshipApply/${application._id}`, new_applicationStatus)
          .then(function (response) {
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
              loadAppliedScholarships();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Application Rejected!",
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


  const handleAccept = (application) => {
    const new_applicationStatus = {
      new_applicationStatus: 'completed',
    }

    // --------- send server start -----
    axiosSecure.patch(`/scholarshipApply/${application._id}`, new_applicationStatus)
      .then(function (response) {
        console.log(response.data);
        if (response.data.modifiedCount > 0) {
          loadAppliedScholarships();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Application Accepted!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  };

  const handleFeedback = (application) => {
    setSelectedApplication(application);
    document.getElementById(`feedbackModal${selectedApplication?._id}`).showModal();
    console.log('click handleFeedback', application);
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback.value;
    console.log(feedback);
    // --------- send server start ----- 
    await axiosSecure.put(`/scholarshipApplyFeedback/${selectedApplication._id}`, { applicantFeedback: feedback })
      .then(function (response) {
        console.log(response.data);
        if (response.data.modifiedCount > 0) {
          document.getElementById(`feedbackModal${selectedApplication?._id}`).close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks for feedback!",
            showConfirmButton: false,
            timer: 1500
          });

          const new_applicationStatus = {
            new_applicationStatus: 'processing',
          }
          // --------- send server start -----
          axiosSecure.patch(`/scholarshipApply/${selectedApplication._id}`, new_applicationStatus)
            .then(function (response) {
              console.log(response.data);
              if (response.data.modifiedCount > 0) {
                loadAppliedScholarships();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          // --------- send server end -----
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  };

  const allFunctions = { handleViewDetails, handleCancel, handleAccept, handleFeedback };
  
  // ----- sort start ------------
  const handleSortChange = () => {
    const sortBy = document.getElementById('sort_type').value;
    const sortOrder = document.getElementById('sort_order').value;
    sortData(sortBy, sortOrder);
  }

  const sortData = (sortBy, sortOrder) => {
    const sortedData = [...appliedScholarships];

    switch (sortBy) {
      case 'deadline':
        sortedData.sort((a, b) => {
          const dateA = new Date(a.applicationDeadline);
          const dateB = new Date(b.applicationDeadline);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        break;
      case 'applied':
        sortedData.sort((a, b) => {
          const dateA = new Date(a.applyDate);
          const dateB = new Date(b.applyDate);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        break;
      default:
        break;
    }
    setAppliedScholarships(sortedData);
  }
  // ----- sort end ------------
  return (
    <div>
      <Helmet>
        <title>All Applied Scholarships | ScholarPoint</title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">All Applied Scholarships</h3>
      {/* ---------- sort start ----------- */}
      <div className="flex flex-col md:flex-row justify-center gap-5 space-x-4 p-4">
        <div className='flex gap-2'>
          <label htmlFor="sort_type">Sort By:</label>
          <select className='border-2' id="sort_type" onChange={handleSortChange}>
            <option value="applied">Applied Date</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>
        <div className='flex gap-2'>
          <label htmlFor="sort_order">Sort Order:</label>
          <select className='border-2' id="sort_order" onChange={handleSortChange}>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </div>
      {/* ---------- sort end ----------- */}
      {/* Table to display applied scholarships */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-center">University<br />Name</th>
              <th className="text-center">Scholarship <br />Name</th>
              <th className="text-center">Scholarship <br />Category</th>
              <th className="text-center">Subject <br />Category</th>
              <th className="text-center">Applied <br />Degree</th>
              <th className="text-center">Application <br />Fees</th>
              <th className="text-center">Service <br />Charge</th>
              <th className="text-center">Applied Date</th>
              <th className="text-center">Application <br />Deadline</th>
              <th className="text-center">Application <br />Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          {loading &&
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>}
          <tbody>
            {appliedScholarships.map((application) => (
              <AppliedScholarshipRow
                key={application._id}
                application={application}
                allFunctions={allFunctions}
              ></AppliedScholarshipRow>
            ))}
          </tbody>
        </table>
      </div>
      {/* ---------- detailsViewModal modal add --------- */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        {selectedApplication &&
          <dialog id={`detailsViewModal${selectedApplication?._id}`} className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg text-center mb-2">Application</h3>
              <div className="flex justify-center">
                <div className="grid gap-1">
                  <p><span className="font-bold">University Name:</span> {selectedApplication.universityName}</p>
                  <p><span className="font-bold">Applying Degree:</span> {selectedApplication.applicantApplyingDegree}</p>
                  <p><span className="font-bold">Scholarship Category:</span> {selectedApplication.scholarshipCategory}</p>
                </div>
              </div>
            </div>
          </dialog>}
      </div>
      {/* ---------- feedbackModal modal add --------- */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        {selectedApplication &&
          <dialog id={`feedbackModal${selectedApplication?._id}`} className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg text-center mb-2">Feedback</h3>
              <form
                onSubmit={handleAddFeedback}
                className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <label className="flex flex-col gap-1 w-full">
                    <span>Feedback</span>
                    <textarea name="feedback" placeholder="Write your feedback here" className="textarea textarea-bordered h-24 w-full" required ></textarea>
                  </label>
                </div>
                <div className="gap-5">
                  <label className="flex flex-col gap-1 w-full">
                    <input type="submit" value="Submit" className="btn bg-secondary text-secondary-content w-full" />
                  </label>
                </div>
              </form>
            </div>
          </dialog>}
      </div>
    </div>
  );
};

export default AllAppliedScholarship;
