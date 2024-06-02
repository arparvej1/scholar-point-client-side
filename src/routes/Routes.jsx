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
import AllScholarship from "../pages/AllScholarship/AllScholarship/AllScholarship";
import UserDashboard from "../pages/DashBoard/UserDashboard/UserDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import AddScholarship from "../pages/AllScholarship/AddScholarship/AddScholarship";
import UpdateScholarship from "../pages/AllScholarship/UpdateScholarship/UpdateScholarship";
import DetailsScholarship from "../pages/AllScholarship/DetailsScholarship/DetailsScholarship";

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
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>,
      },
      // -------- Admin Routes Start ------------
      {
        path: '/profile2',
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
      // -------- Admin Routes End ------------
      // -------- Agent Routes Start ------------
      {
        path: '/add-scholarship',
        element: <PrivateRoutes><AddScholarship></AddScholarship></PrivateRoutes>
      },
      {
        path: '/update-scholarship/:scholarshipId',
        element: <PrivateRoutes><UpdateScholarship></UpdateScholarship></PrivateRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/scholarship/${params.scholarshipId}`)
      },
      // -------- Agent Routes End ------------
      // --------- User Dashboard Start ------------
      {
        path: '/scholarship/:scholarshipId',
        element: <PrivateRoutes><DetailsScholarship></DetailsScholarship></PrivateRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/scholarship/${params.scholarshipId}`)
      },
      // --------- User Dashboard End ------------
      {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
          // --------- User Dashboard Start in Dashboard ------------
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
