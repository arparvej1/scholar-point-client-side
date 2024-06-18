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
import DashboardLayout from "../layouts/DashboardLayout";
import AddScholarship from "../pages/AllScholarship/AddScholarship/AddScholarship";
import UpdateScholarship from "../pages/AllScholarship/UpdateScholarship/UpdateScholarship";
import DetailsScholarship from "../pages/AllScholarship/DetailsScholarship/DetailsScholarship";
import PaymentPage from "../pages/AllScholarship/PaymentPage/PaymentPage";
import ScholarshipApplyForm from "../pages/AllScholarship/ScholarshipApply/ScholarshipApplyForm";
import ScholarshipApplyDetails from "../pages/AllScholarship/ScholarshipApply/ScholarshipApplyDetails";
import MyApplication from "../pages/DashBoard/UserDashboard/MyApplication/MyApplication";
import MyReviews from "../pages/DashBoard/UserDashboard/MyReviews/MyReviews";
import ScholarshipApplyFormEdit from "../pages/AllScholarship/ScholarshipApply/ScholarshipApplyFormEdit";
import Dashboard from "../pages/DashBoard/Dashboard";
import AgentRoutes from "../PrivateRoutes/isAgent/AgentRoutes";
import ManageScholarships from "../pages/DashBoard/AgentDashboard/ManageScholarships/ManageScholarships";
import AllReviews from "../pages/DashBoard/AgentDashboard/AllReviews/AllReviews";
import AllAppliedScholarship from "../pages/DashBoard/AgentDashboard/AllAppliedScholarship/AllAppliedScholarship";
import ManageUsers from "../pages/DashBoard/AdminDashboard/ManageUsers/ManageUsers";
import AllScholarshipSearch from "../pages/AllScholarship/AllScholarship/AllScholarshipSearch";

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
        path: '/all-scholarship-search',
        element: <AllScholarshipSearch></AllScholarshipSearch>
      },
      {
        path: '/update-profile',
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>,
      },
      // -------- Admin Routes Start ------------
      // -------- Admin Routes End ------------
      // -------- Agent Routes Start ------------
      // -------- Agent Routes End ------------
      // --------- User Dashboard Start ------------
      {
        path: '/scholarship/:scholarshipId',
        element: <PrivateRoutes><DetailsScholarship></DetailsScholarship></PrivateRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/scholarship/${params.scholarshipId}`)
      },
      {
        path: '/payment/:scholarshipId',
        element: <PrivateRoutes><PaymentPage></PaymentPage></PrivateRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/scholarship/${params.scholarshipId}`)
      },
      {
        path: '/scholarship-apply/:scholarshipId',
        element: <PrivateRoutes><ScholarshipApplyForm></ScholarshipApplyForm></PrivateRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/scholarship/${params.scholarshipId}`)
      },
      // --------- User Dashboard End ------------
      {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
          {
            path: '',
            element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
          },
          // --------- User Dashboard Start in Dashboard ------------
          {
            path: 'profile',
            element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
          },
          {
            path: 'my-application',
            element: <PrivateRoutes><MyApplication></MyApplication></PrivateRoutes>
          },
          {
            path: 'my-reviews',
            element: <PrivateRoutes><MyReviews></MyReviews></PrivateRoutes>
          },
          {
            path: 'scholarship-apply-details/:applyId',
            element: <PrivateRoutes><ScholarshipApplyDetails></ScholarshipApplyDetails></PrivateRoutes>,
            loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/apply/${params.applyId}`)
          },
          {
            path: 'scholarship-apply-edit/:applyId',
            element: <PrivateRoutes><ScholarshipApplyFormEdit></ScholarshipApplyFormEdit></PrivateRoutes>,
            loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/apply/${params.applyId}`)
          },
          // --------- Agent Dashboard Start in Dashboard ------------
          {
            path: 'add-scholarship',
            element: <AgentRoutes><AddScholarship></AddScholarship></AgentRoutes>
          },
          {
            path: 'update-scholarship/:scholarshipId',
            element: <AgentRoutes><UpdateScholarship></UpdateScholarship></AgentRoutes>,
            loader: ({ params }) => fetch(`${import.meta.env.VITE_VERCEL_API}/scholarship/${params.scholarshipId}`)
          },
          {
            path: 'manage-scholarships',
            element: <AgentRoutes><ManageScholarships></ManageScholarships></AgentRoutes>
          },
          {
            path: 'all-reviews',
            element: <AgentRoutes><AllReviews></AllReviews></AgentRoutes>
          },
          {
            path: 'all-applied-scholarship',
            element: <AgentRoutes><AllAppliedScholarship></AllAppliedScholarship></AgentRoutes>
          },
          // --------- Admin Dashboard Start in Dashboard ------------
          {
            path: 'manage-users',
            element: <AgentRoutes><ManageUsers></ManageUsers></AgentRoutes>
          },
        ]
      },
    ]
  }
]);

export default router;
