import { useLoaderData } from "react-router-dom";

const DetailsScholarship = () => {
  const scholarship = useLoaderData();

  console.log(scholarship);

  return (
    <div>
      DetailsScholarship: {scholarship._id}
    </div>
  );
};

export default DetailsScholarship;