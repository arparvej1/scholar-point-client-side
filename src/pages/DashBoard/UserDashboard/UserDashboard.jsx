import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const UserDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    console.log(user.email);
  }, [loading, user]);

  return (
    <div>
      User Dashboard: {user.displayName}
    </div>
  );
};

export default UserDashboard;