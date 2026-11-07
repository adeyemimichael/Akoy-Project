import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminAuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#334155",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "12px",
            padding: "12px 16px",
            border: "2px solid #cbd5e1",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
          success: {
            duration: 3000,
            style: {
              background: "#fff",
              color: "#059669",
              border: "2px solid #059669",
            },
            iconTheme: {
              primary: "#059669",
              secondary: "#fff",
            },
          },
          error: {
            duration: 6000,
            style: {
              background: "#fff",
              color: "#dc2626",
              border: "2px solid #dc2626",
            },
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fff",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </AdminAuthProvider>
  </StrictMode>,
);
