import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && !loading) {
      axiosSecure.get(`/checkAdmin/${user?.email}`)
        .then(res => {
          // console.log(res.data);
          if (res.data.admin) {
            setIsAdmin(true);
            setAdminLoading(false);
          }
          // console.log('check Admin hit');
        })
        .catch(error => {
          console.log(error);
          console.log('check Admin not hit');
        });
      // console.log(user.email);
    }
  }, [user, loading]);

  return { isAdmin, adminLoading };
};

export default CheckAdmin;
