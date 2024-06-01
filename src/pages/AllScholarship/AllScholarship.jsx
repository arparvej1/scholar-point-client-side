import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const AllScholarship = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      axios.get(`${import.meta.env.VITE_VERCEL_API}/users/${user.email}`, { withCredentials: true })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [loading]);

  return (
    <div>
      All Scholarship
    </div>
  );
};

export default AllScholarship;