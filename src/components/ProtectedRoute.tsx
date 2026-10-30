import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

const LoadingSpinner: React.FC = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: "var(--brand-deep)" }}
  >
    <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAdminAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
