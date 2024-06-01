import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Profile from "../pages/User/Profile/Profile";
import UpdateProfile from "../pages/User/Profile/UpdateProfile";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import UserDashboard from "../pages/DashBoard/UserDashboard/UserDashboard";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/all-scholarship',
        element: <AllScholarship></AllScholarship>
      },
      {
        path: '/profile',
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
      {
        path: '/update-profile',
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
      },
      {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
          // --------- User Dashboard ------------
          {
            path: '',
            element: <PrivateRoutes><UserDashboard></UserDashboard></PrivateRoutes>
          },
        ]
      },
    ]
  }
]);

export default router;
