import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!loading) {
      if (user) {
        axiosSecure.get(`/checkAdmin/${user.email}`)
          .then(res => {
            // console.log(res.data);
            if (res.data.admin) {
              setIsAdmin(true);
            }
            setAdminLoading(false);
          })
          .catch(error => {
            console.log(error);
            setAdminLoading(false);
          });
      } else {
        setAdminLoading(false);
      }
    }
  }, [user, loading]);

  return { isAdmin, adminLoading };
};

export default CheckAdmin;
