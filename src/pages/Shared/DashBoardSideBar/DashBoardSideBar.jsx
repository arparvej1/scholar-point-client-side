import { Link, NavLink, useLocation } from "react-router-dom";
import useUserPower from "../../../hooks/useUserPower";

const DashBoardSideBar = () => {
  const location = useLocation();
  const { isAdmin, adminLoading, isAgent, agentLoading, isAgentOrAdmin, agentOrAdminLoading } = useUserPower();

  const navLinks = <>
    <li><Link className={`${location.pathname === "/dashboard" || location.pathname === "/dashboard/agent" || location.pathname === "/dashboard/admin" ? 'active' : undefined}`} to='/dashboard'>Dashboard</Link></li>
    <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
    {
      !isAgentOrAdmin && <>
        <li><NavLink to='/dashboard/my-application'>My Application</NavLink></li>
        <li><NavLink to='/dashboard/my-reviews'>My Reviews</NavLink></li>
      </>
    }
    {
      isAgentOrAdmin && <>
        <li><NavLink to='/dashboard/add-scholarship'>Add Scholarship</NavLink></li>
        <li><NavLink to='/dashboard/add-scholarship'>Manage Scholarships</NavLink></li>
        <li><NavLink to='/dashboard/add-scholarship'>All Reviews</NavLink></li>
        <li><NavLink to='/dashboard/add-scholarship'>All applied Scholarships</NavLink></li>
      </>
    }
  </>
  return (
    <div className="md:h-full bg-blue-500">
      <ul className="menu flex flex-row md:flex-col flex-wrap text-white">
        {navLinks}
      </ul>
    </div>
  );
};

export default DashBoardSideBar;