import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashboardLayout from "./components/layouts/DashboardLayout.jsx";
import Dashboard from "../src/pages/Dashboard.jsx";
import Applications from "../src/pages/Applications.jsx";
import AddApplication from "../src/pages/AddApplication.jsx";
import EditApplication from "./pages/EditApplication.jsx";
import ApplicationDetails from "./pages/ApplicationDetails.jsx";
import ApplicationProvider from "../src/context/ApplicationContext.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "applications/new",
        element: <AddApplication />,
      },
      {
        path: "applications/:id",
        element: <ApplicationDetails />,
      },
      {
        path: "applications/:id/edit",
        element: <EditApplication />,
      },
      {
        path: "applications/:id",
        element: <ApplicationDetails />,
      },
      {
        path: "applications/:id/edit",
        element: <EditApplication />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApplicationProvider>
      <RouterProvider router={router} />
    </ApplicationProvider>
  </StrictMode>,
);
