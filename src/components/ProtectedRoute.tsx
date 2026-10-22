import React from "react";
import { Outlet } from "react-router-dom";

// Auth is bypassed for now — all admin routes are freely accessible.
// Re-enable auth by uncommenting the block below when Supabase is connected.
const ProtectedRoute: React.FC = () => {
  return <Outlet />;

  // --- Restore this when ready ---
  // const { user, loading } = useAdminAuth();
  // if (loading) return <LoadingSpinner />;
  // if (!user) return <Navigate to="/admin/login" replace />;
  // return <Outlet />;
};

export default ProtectedRoute;
