import UserDashboard from "./UserDashboard/UserDashboard";
import AgentDashboard from "./AgentDashboard/AgentDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import CheckAdmin from "../../PrivateRoutes/isAdmin/CheckAdmin";
import CheckAgent from "../../PrivateRoutes/isAgent/CheckAgent";

const Dashboard = () => {
  const { isAdmin, adminLoading } = CheckAdmin();
  const { isAgent, agentLoading } = CheckAgent();

  if (adminLoading || agentLoading) return <span className="loading loading-ball loading-lg"></span>

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