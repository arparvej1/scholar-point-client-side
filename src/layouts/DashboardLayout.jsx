import { Outlet } from "react-router-dom";
import DashBoardSideBar from "../pages/Shared/DashBoardSideBar/DashBoardSideBar";

const DashboardLayout = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-5 xl:px-5 2xl:px-0 lg:mx-auto">
      </div>
      <div className="grid md:grid-cols-6">
        <div className="col-span-1">
          <DashBoardSideBar></DashBoardSideBar>
        </div>
        <div className="md:col-span-5 max-w-screen-xl mx-5 xl:px-5 2xl:px-0">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;