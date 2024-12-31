import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import VehicleList from "./components/vehicles/vehicleList";
import Vehicle from "./components/vehicles/vehicle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <VehicleList /> }],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [{ path: "/edit/:id", element: <Vehicle/> }],
  },
  {
    path: "/create",
    element: <App />,
    children: [{ path: "create", element: <Vehicle/> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);