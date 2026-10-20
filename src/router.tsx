import { createBrowserRouter, Navigate } from "react-router-dom";

// Public site
import RootLayout from "./RootLayout";
import Homepage from "./pages/Homepage";
import DivisionPage from "./pages/DivisionPage";
// Admin
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import { AdminLayout } from "./admin/components/AdminLayout";
import Inquiries from "./admin/pages/Inquiries";
import Divisions from "./admin/pages/Divisions";
import Testimonials from "./admin/pages/Testimonials";
import Gallery from "./admin/pages/Gallery";
import Subscribers from "./admin/pages/Subscribers";
import SiteSettings from "./admin/pages/SiteSettings";

const router = createBrowserRouter([
  // ── Public site ──────────────────────────────────────────────
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "divisions/:divisionId", element: <DivisionPage /> },
    ],
  },

  // ── Admin: login (bypassed for now — goes straight to dashboard) ─
  {
    path: "/admin/login",
    element: <Navigate to="/admin/dashboard" replace />,
  },

  // ── Admin: protected routes ───────────────────────────────────
  {
    path: "/admin",
    element: (
      <AdminAuthProvider>
        <ProtectedRoute />
      </AdminAuthProvider>
    ),
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: "dashboard",    element: <Dashboard /> },
          { path: "inquiries",    element: <Inquiries /> },
          { path: "divisions",    element: <Divisions /> },
          { path: "testimonials", element: <Testimonials /> },
          { path: "gallery",      element: <Gallery /> },
          { path: "subscribers",  element: <Subscribers /> },
          { path: "settings",     element: <SiteSettings /> },
        ],
      },
    ],
  },
]);

export default router;
