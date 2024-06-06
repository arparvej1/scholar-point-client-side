import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const DashBoardSideBar = () => {
  const location = useLocation();
  const isAdmin = useState(true);

  const navLinks = <>
    <li><Link className={`${location.pathname === "/dashboard" ? 'active' : undefined}`} to='/dashboard'>Dashboard</Link></li>
    <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
    <li><NavLink to='/dashboard/my-application'>My Application</NavLink></li>
    <li><NavLink to='/dashboard/my-reviews'>My Reviews</NavLink></li>
    {
      isAdmin && <>
        <li><NavLink to='/add-scholarship'>Add Scholarship</NavLink></li>
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