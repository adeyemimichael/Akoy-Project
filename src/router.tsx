import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Homepage /> }],
  },
]);
export default router;
