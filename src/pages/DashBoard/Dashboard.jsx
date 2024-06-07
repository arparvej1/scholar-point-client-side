import UserDashboard from "./UserDashboard/UserDashboard";
import AgentDashboard from "./AgentDashboard/AgentDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import useUserPower from "../../hooks/useUserPower";

const Dashboard = () => {
  const { isAdmin, adminLoading, isAgent, agentLoading } = useUserPower();

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