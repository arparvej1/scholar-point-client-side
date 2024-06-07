import axios from "axios";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";


const UpdateScholarship = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const scholarship = useLoaderData();
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
    scholarshipDescription,
    // postedUserEmail,
    // postedUserDisplayName
  } = scholarship;

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const form = e.target;
    const new_scholarshipName = form.scholarshipName.value;
    const new_universityName = form.universityName.value;
    const new_universityLogo = form.universityLogo.value;
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
    axios.put(`${import.meta.env.VITE_VERCEL_API}/scholarship/${_id}`, completeItem)
      .then(function (response) {
        console.log(response.data);
        if (response.data.modifiedCount) {
          Swal.fire({
            title: 'Success!',
            text: 'Successfully Update Scholarship!',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
          navigate(`/scholarship/${_id}`);
        }
        // form.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title> Add Scholarship | ScholarPoint </title>
      </Helmet>
      <div className="max-w-4xl mx-auto mt-5 bg-accent text-accent-content p-5 md:p-8 lg:p-10 rounded-xl">
        <h3 className="text-2xl md:text-3xl text-center mb-6 font-semibold mx-auto">Update Scholarship</h3>
        <form
          onSubmit={handleUpdateItem}
          className="flex flex-col gap-5">
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Scholarship Name</span>
              <input type="text" name="scholarshipName" defaultValue={scholarshipName} placeholder="Scholarship Name" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>University Name</span>
              <input type="text" name="universityName" defaultValue={universityName} placeholder="University Name" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>University Logo</span>
              <input type="text" name="universityLogo" defaultValue={universityLogo} placeholder="University Logo" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>University Country</span>
              <input type="text" name="universityCountry" defaultValue={universityCountry} placeholder="University Country" className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>University City</span>
              <input type="text" name="universityCity" defaultValue={universityCity} placeholder="University City" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>University Rank</span>
              <input type="text" name="universityRank" defaultValue={universityRank} placeholder="University Rank" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Subject Category</span>
              <div className="flex gap-1">
                <select name="subjectCategory" className="select select-bordered w-full">
                  <option selected={subjectCategory === 'Agriculture'} value="Agriculture">Agriculture</option>
                  <option selected={subjectCategory === 'Engineering'} value="Engineering">Engineering</option>
                  <option selected={subjectCategory === 'Doctor'} value="Doctor">Doctor</option>
                </select>
              </div>
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Scholarship Category</span>
              <div className="flex gap-1">
                <select name="scholarshipCategory" className="select select-bordered w-full">
                  <option selected={scholarshipCategory === 'Full fund'} value="Full fund">Full fund</option>
                  <option selected={scholarshipCategory === 'Partial'} value="Partial">Partial</option>
                  <option selected={scholarshipCategory === 'Self-fund'} value="Self-fund">Self-fund</option>
                </select>
              </div>
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Degree</span>
              <div className="flex gap-1">
                <select name="degree" className="select select-bordered w-full">
                  <option selected={degree === 'Diploma'} value="Diploma">Diploma</option>
                  <option selected={degree === 'Bachelor'} value="Bachelor">Bachelor</option>
                  <option selected={degree === 'Masters'} value="Masters">Masters</option>
                </select>
              </div>
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Tuition Fees</span>
              <input type="text" name="tuitionFees" defaultValue={tuitionFees} placeholder="Tuition Fees" className="input input-bordered w-full" />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Application Fees</span>
              <input type="text" name="applicationFees" defaultValue={applicationFees} placeholder="Application Fees" className="input input-bordered w-full" />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Service Charge</span>
              <input type="text" name="serviceCharge" defaultValue={serviceCharge} placeholder="Service Charge" className="input input-bordered w-full" />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Scholarship Post Date</span>
              <input type="date" name="scholarshipPostDate" defaultValue={scholarshipPostDate} value={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Application Deadline</span>
              <input type="date" name="applicationDeadline" defaultValue={applicationDeadline} min={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Scholarship Description</span>
              <textarea name="scholarshipDescription" defaultValue={scholarshipDescription} placeholder="Scholarship Description" className="textarea textarea-bordered h-24 w-full" required ></textarea>
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
      <ToastContainer />
    </div>
  );
};

export default UpdateScholarship;