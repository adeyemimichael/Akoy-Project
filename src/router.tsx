import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DivisionPage from "./pages/DivisionPage";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "divisions/:divisionId", element: <DivisionPage /> },
    ],
  },
]);
export default router;
