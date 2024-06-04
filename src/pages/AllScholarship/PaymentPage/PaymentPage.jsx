import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentPage = () => {
  const { user } = useContext(AuthContext);
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
    postedUserEmail,
    postedUserDisplayName
  } = scholarship;
  return (
    <div>
      <Helmet>
        <title> Payment | {scholarshipName} | ScholarPoint </title>
      </Helmet>
      {/* <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle> */}
      <div className="md:w-1/2 mx-auto border-2 rounded-2xl shadow-xl p-5 m-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            scholarship={scholarship}
          ></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;