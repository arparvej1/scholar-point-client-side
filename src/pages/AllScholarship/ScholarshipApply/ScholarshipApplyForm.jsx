import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ScholarshipApplyForm = () => {
  const scholarship = useLoaderData();
  const { user } = useAuth();
  const { _id, scholarshipName, universityName, subjectCategory, scholarshipCategory, applicationFees, serviceCharge } = scholarship;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [applyData, setApplyData] = useState(false);

  const loadApplyData = async () => {
    const res = await axiosSecure.get(`/scholarshipApply/${user.email}`)
    console.log(res.data);
    if (Array.isArray(res.data)) {
      const filterApply = res.data.some(apply => apply.scholarshipId === _id);
      if (filterApply) setApplyData(true);
    }
  };

  useEffect(() => {
    loadApplyData();
  }, []);

  const loadPayments = async () => {
    const res = await axiosSecure.get(`/payments/${user.email}`)
    // console.log(res.data);
    if (Array.isArray(res.data)) {
      const scholarshipPayment = res.data.some(payment => payment.scholarshipId === scholarship._id);
      if (scholarshipPayment) return true;
      return false;
    } else {
      console.log('Response data is not an array.');
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const alreadyPurchased = await loadPayments();
      if (!alreadyPurchased) {
        console.log(alreadyPurchased);
        navigate(`/scholarship/${_id}`);
      }
    };
    fetchData();
  }, []);

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

  const handleApplyForm = async (e) => {
    e.preventDefault();

    if (applyData) return toast.warn('Already apply this scholarship.');

    const form = e.target;
    const applicantPhoneNumber = form.applicantPhoneNumber.value;
    const applicantAddressVillage = form.applicantAddressVillage.value;
    const applicantAddressDistrict = form.applicantAddressDistrict.value;
    const applicantAddressCountry = form.applicantAddressCountry.value;
    const applicantGender = form.applicantGender.value;
    const applicantApplyingDegree = form.applicantApplyingDegree.value;
    const sscResult = form.sscResult.value;
    const hscResult = form.hscResult.value;
    const studyGap = form.studyGap.value || null;
    const universityName = form.universityName.value;
    const scholarshipCategory = form.scholarshipCategory.value;
    const subjectCategory = form.subjectCategory.value;
    const email = user.email;
    const userDisplayName = user.displayName;
    const scholarshipId = scholarship._id;
    const applyDate = new Date().toISOString().substring(0, 10);

    const westernRegex = /^01\d{9}$/;
    if (!westernRegex.test(applicantPhoneNumber)) {
      setErrorMessage('Mobile number is wrong, enter correct number.');
      toast.warn('Mobile number is wrong, enter correct number.');
      return;
    } else {
      setErrorMessage('');
    }

    const uploadImage = form.applicantPhoto;
    const applicantPhoto = await uploadImage_imgbb(uploadImage);
    if (!applicantPhoto) return;

    const completeApply = {
      applicantPhoneNumber,
      applicantAddressVillage,
      applicantAddressDistrict,
      applicantAddressCountry,
      applicantGender,
      applicantApplyingDegree,
      sscResult,
      hscResult,
      studyGap,
      universityName,
      scholarshipCategory,
      subjectCategory,
      email,
      userDisplayName,
      scholarshipId,
      applyDate,
      applicantPhoto,
      scholarshipName: scholarshipName,
      applicationFees: applicationFees,
      serviceCharge: serviceCharge,
      applicationStatus: 'pending'
    }

    console.log(completeApply);

    // --------- send server start -----
    axiosSecure.post(`/scholarshipApply`, completeApply)
      .then(function (response) {
        console.log(response.data);
        if (response.data.acknowledged) {
          loadApplyData();
          Swal.fire({
            title: 'Success!',
            text: 'Successfully Apply Scholarship!',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
          navigate(`/dashboard/scholarship-apply-details/${response.data.insertedId}`);
        }
        form.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  };


  return (
    <div>
      <Helmet>
        <title> Scholarship Apply Form | {scholarshipName} | ScholarPoint </title>
      </Helmet>
      {/* form start */}
      <div className="max-w-4xl mx-auto mt-5 bg-accent text-accent-content p-5 md:p-8 lg:p-10 rounded-xl">
        <h3 className="text-2xl md:text-3xl text-center mb-6 font-semibold mx-auto">Scholarship Application Form</h3>
        <form onSubmit={handleApplyForm} className="flex flex-col gap-5">
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Applicant Phone Number</span>
              <input type="tel" name="applicantPhoneNumber" placeholder="Applicant Phone Number" className="input input-bordered w-full" required />
            </label>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Applicant Photo</span>
              <input type="file" name="applicantPhoto" className="file-input file-input-bordered w-full max-w-xs" required />
            </label>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Applicant Address (Village)</span>
              <input type="text" name="applicantAddressVillage" placeholder="Village" className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>District</span>
              <input type="text" name="applicantAddressDistrict" placeholder="District" className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Country</span>
              <input type="text" name="applicantAddressCountry" placeholder="Country" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Applicant Gender</span>
              <select name="applicantGender" className="select select-bordered w-full" required>
                <option disabled selected value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Applicant Applying Degree</span>
              <select name="applicantApplyingDegree" className="select select-bordered w-full" required>
                <option disabled selected value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </label>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>SSC Result</span>
              <input type="text" name="sscResult" placeholder="SSC Result" className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>HSC Result</span>
              <input type="text" name="hscResult" placeholder="HSC Result" className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Study Gap</span>
              <select name="studyGap" className="select select-bordered w-full">
                <option disabled selected value="">Select Study Gap</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2+ years">2+ years</option>
              </select>
            </label>
          </div>
          <div className="p-4 border-secondary border-[2px]">
            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>University Name</span>
                <input type="text" name="universityName" value={universityName} placeholder="University Name" className="input input-bordered text-base-content bg-base-200 w-full" readOnly />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span>Scholarship Category</span>
                <input type="text" name="scholarshipCategory" value={scholarshipCategory} placeholder="Scholarship Category" className="input input-bordered text-base-content bg-base-200 w-full" readOnly />
              </label>
            </div>
            <div className="gap-5">
              <label className="flex flex-col gap-1 w-full">
                <span>Subject Category</span>
                <input type="text" name="subjectCategory" value={subjectCategory} placeholder="Subject Category" className="input input-bordered text-base-content bg-base-200 w-full" readOnly />
              </label>
            </div>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <input type="submit" value="Apply Now" className="btn bg-secondary text-secondary-content w-full" />
            </label>
          </div>
        </form>
      </div>
      {/* form end */}
      <ToastContainer />
    </div>
  );
};

export default ScholarshipApplyForm;