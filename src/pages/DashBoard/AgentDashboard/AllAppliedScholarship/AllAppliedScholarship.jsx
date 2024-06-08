import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import AppliedScholarshipRow from "./AppliedScholarshipRow";

const AllAppliedScholarship = () => {
  const { user } = useAuth();
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppliedScholarships = async () => {
      try {
        const response = await axiosSecure.get(`${import.meta.env.VITE_VERCEL_API}/allScholarshipApply/${user.email}`);
        setAppliedScholarships(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applied scholarships:", error);
      }
    };

    loadAppliedScholarships();
  }, []);

  const [selectedApplication, setSelectedApplication] = useState([]);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    console.log('click details', application);
    document.getElementById(`detailsViewModal${selectedApplication?._id}`).showModal();
  };

  const handleCancel = (application) => {
    // setSelectedApplication(application);
    console.log('click handleCancel', application);
  };

  const handleFeedback = (application) => {
    // setSelectedApplication(application);
    console.log('click handleFeedback', application);
  };

  const allFunctions = { handleViewDetails, handleCancel, handleFeedback };

  return (
    <div>
      <Helmet>
        <title>All Applied Scholarships | ScholarPoint</title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">All Applied Scholarships</h3>
      {/* Table to display applied scholarships */}
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">University<br />Name</th>
            <th className="text-center">Scholarship <br />Name</th>
            <th className="text-center">Scholarship <br />Category</th>
            <th className="text-center">Subject <br />Category</th>
            <th className="text-center">Applied <br />Degree</th>
            <th className="text-center">Application <br />Fees</th>
            <th className="text-center">Service <br />Charge</th>
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
      {/* ---------- review modal add --------- */}
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
    </div>
  );
};

export default AllAppliedScholarship;
