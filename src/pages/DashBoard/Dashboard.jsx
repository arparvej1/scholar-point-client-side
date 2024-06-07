import { useState } from "react";
import UserDashboard from "./UserDashboard/UserDashboard";
import AgentDashboard from "./AgentDashboard/AgentDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import CheckAdmin from "../../PrivateRoutes/isAdmin/CheckAdmin";

const Dashboard = () => {

  const [isAgent, aa] = useState(false);
  const { isAdmin, adminLoading } = CheckAdmin();


  return (
    <div>
      {
        !isAgent && !isAdmin && < UserDashboard />
      }
      {
        isAgent && !isAdmin && < AgentDashboard />
      }
      {
        isAdmin && < AdminDashboard />
      }
    </div>
  );
};

export default Dashboard;