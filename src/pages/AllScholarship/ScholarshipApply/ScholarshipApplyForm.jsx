import { useLoaderData } from "react-router-dom";

const ScholarshipApplyForm = () => {
  const scholarship = useLoaderData();
  const { _id } = scholarship;
  return (
    <div>
      ScholarshipApply: {_id}
    </div>
  );
};

export default ScholarshipApplyForm;