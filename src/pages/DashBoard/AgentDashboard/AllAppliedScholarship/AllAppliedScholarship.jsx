import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AppliedScholarshipCard from "./AppliedScholarshipCard";

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

  return (
    <div>
      <Helmet>
        <title>All Applied Scholarships | ScholarPoint</title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">All Applied Scholarships</h3>
      {/* Display applied scholarships */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appliedScholarships.map((application) => (
              <AppliedScholarshipCard
                key={application._id}
                application={application}
                // onViewDetails={handleViewDetails}
                // onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppliedScholarship;
