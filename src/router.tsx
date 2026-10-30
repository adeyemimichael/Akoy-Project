import { createBrowserRouter, Navigate } from "react-router-dom";

// Public site
import RootLayout from "./RootLayout";
import Homepage from "./pages/Homepage";
import DivisionPage from "./pages/DivisionPage";
// Admin
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminLayout } from "./AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Inquiries from "./pages/admin/Inquiries";
import Divisions from "./pages/admin/Divisions";
import Testimonials from "./pages/admin/Testimonials";
import Gallery from "./pages/admin/Gallery";
import Subscribers from "./pages/admin/Subscribers";
import SiteSettings from "./pages/admin/SiteSettings";
import AdminLogin from "./pages/admin/AdminLogin";

const router = createBrowserRouter([

  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "divisions/:divisionId", element: <DivisionPage /> },
    ],
  },

  
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },


  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "inquiries", element: <Inquiries /> },
          { path: "divisions", element: <Divisions /> },
          { path: "testimonials", element: <Testimonials /> },
          { path: "gallery", element: <Gallery /> },
          { path: "subscribers", element: <Subscribers /> },
          { path: "settings", element: <SiteSettings /> },
        ],
      },
    ],
  },
]);

export default router;
