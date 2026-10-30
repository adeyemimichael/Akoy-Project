import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  </StrictMode>,
);
