import axios from "axios";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CheckAgentOrAdmin from "../../../PrivateRoutes/isAgent/CheckAgentOrAdmin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarship = () => {
  const { user } = useContext(AuthContext);
  const { isAgentOrAdmin } = CheckAgentOrAdmin();
  const axiosPublic = useAxiosPublic();

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

  const handleAddItem = async (e) => {
    e.preventDefault();
    const uploadImage = e.target.universityLogo;
    const universityLogo = await uploadImage_imgbb(uploadImage);
    if (!universityLogo) return;

    const form = e.target;
    const scholarshipName = form.scholarshipName.value;
    const universityName = form.universityName.value;
    const universityCountry = form.universityCountry.value;
    const universityCity = form.universityCity.value;
    const universityRank = form.universityRank.value;
    const subjectCategory = form.subjectCategory.value;
    const scholarshipCategory = form.scholarshipCategory.value;
    const degree = form.degree.value;
    const tuitionFees = form.tuitionFees.value;
    const applicationFees = form.applicationFees.value;
    const serviceCharge = form.serviceCharge.value;
    const applicationDeadline = form.applicationDeadline.value;
    const scholarshipPostDate = form.scholarshipPostDate.value;
    const scholarshipDescription = form.scholarshipDescription.value;
    const postedUserEmail = user.email;
    const postedUserDisplayName = user.displayName;

    const completeItem = {
      scholarshipName,
      universityName,
      universityLogo,
      universityCountry,
      universityCity,
      universityRank: parseInt(universityRank),
      subjectCategory,
      scholarshipCategory,
      degree,
      tuitionFees: parseInt(tuitionFees),
      applicationFees: parseInt(applicationFees),
      serviceCharge: parseInt(serviceCharge),
      applicationDeadline,
      scholarshipPostDate,
      scholarshipDescription,
      postedUserEmail,
      postedUserDisplayName
    }

    console.log(completeItem);

    // --------- send server start -----
    axios.post(`${import.meta.env.VITE_VERCEL_API}/scholarships`, completeItem)
      .then(function (response) {
        console.log(response.data);
        if (response.data.acknowledged) {
          Swal.fire({
            title: 'Success!',
            text: 'Successfully Add Scholarship!',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
        }
        form.reset();
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
      {!isAgentOrAdmin ? <div>Only Admin Access.</div> :
        <div className="max-w-4xl mx-auto mt-5 bg-primary-content p-5 md:p-8 lg:p-10 rounded-xl">
          <h3 className="text-2xl md:text-3xl text-center mb-6 font-semibold mx-auto">Add Scholarship</h3>
          <form
            onSubmit={handleAddItem}
            className="flex flex-col gap-5">
            <div className="gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>Scholarship Name</span>
                <input type="text" name="scholarshipName" placeholder="Scholarship Name" className="input input-bordered w-full" required />
              </label>
            </div>
            <div className="gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>University Name</span>
                <input type="text" name="universityName" placeholder="University Name" className="input input-bordered w-full" required />
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>University Logo</span>
                <input type="file" name="universityLogo" className="file-input file-input-bordered w-full max-w-xs" />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span>University Rank</span>
                <input type="text" name="universityRank" placeholder="University Rank" className="input input-bordered w-full" required />
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>University Country</span>
                <input type="text" name="universityCountry" placeholder="University Country" className="input input-bordered w-full" required />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span>University City</span>
                <input type="text" name="universityCity" placeholder="University City" className="input input-bordered w-full" required />
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>Subject Category</span>
                <div className="flex gap-1">
                  <select name="subjectCategory" className="select select-bordered w-full">
                    <option value="Agriculture">Agriculture</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </div>
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span>Scholarship Category</span>
                <div className="flex gap-1">
                  <select name="scholarshipCategory" className="select select-bordered w-full">
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>Degree</span>
                <div className="flex gap-1">
                  <select name="degree" className="select select-bordered w-full">
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span>Tuition Fees</span>
                <input type="text" name="tuitionFees" placeholder="Tuition Fees" className="input input-bordered w-full" />
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>Application Fees</span>
                <input type="text" name="applicationFees" placeholder="Application Fees" className="input input-bordered w-full" />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span>Service Charge</span>
                <input type="text" name="serviceCharge" placeholder="Service Charge" className="input input-bordered w-full" />
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>Scholarship Post Date</span>
                <input type="date" name="scholarshipPostDate" value={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span>Application Deadline</span>
                <input type="date" name="applicationDeadline" min={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
              </label>
            </div>
            <div className="gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>Scholarship Description</span>
                <textarea name="scholarshipDescription" placeholder="Scholarship Description" className="textarea textarea-bordered h-24 w-full" required ></textarea>
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
                <input type="submit" value="Add New Scholarship" className="btn bg-primary text-primary-content w-full" />
              </label>
            </div>
          </form>
        </div>
      }
      <ToastContainer />
    </div>
  );
};

export default AddScholarship;