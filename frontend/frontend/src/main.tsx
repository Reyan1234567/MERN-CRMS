import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import VehicleList from "./components/vehicles/VehicleList";
import Vehicle from "./components/vehicles/Vehicle";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import DriverList from "./components/Drivers/DriverList";
import Driver from "./components/Drivers/Driver";
import BookingList from "./components/Booking/BookingList";
import Booking from "./components/Booking/Booking";
import Login from "./components/Authorization/Login";
import Register from "./components/Authorization/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  { path: "register", element: <Register /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "vehicles", element: <VehicleList /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "vehicles/create", element: <Vehicle /> },
      { path: "vehicles/edit/:id", element: <Vehicle /> },
      { path: "drivers", element: <DriverList /> },
      { path: "drivers/create", element: <Driver /> },
      { path: "drivers/edit/:id", element: <Driver /> },
      { path: "booking", element: <BookingList /> },
      { path: "booking/create", element: <Booking /> },
      { path: "booking/edit/:id", element: <Booking /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
