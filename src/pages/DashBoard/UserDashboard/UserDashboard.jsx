import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../provider/AuthProvider";


const UserDashboard = () => {

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      axios.get(`${import.meta.env.VITE_VERCEL_API}/users/${user.email}`, { withCredentials: true })
        .then(function (response) {
          // console.log(response.data);
          if (response.data) {
            console.log('Active User: ', user.email);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [loading]);

  return (
    <div>
      User Dashboard
    </div>
  );
};

export default UserDashboard;