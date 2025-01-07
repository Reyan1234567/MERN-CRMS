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
import Booking1 from "./components/Booking/Booking1";
import Booking2 from "./components/Booking/Booking2";
import Login from "./components/Authorization/Login";
import Register from "./components/Authorization/Register";
import EmployeeList from "./components/Employees/EmployeeList";
import Employee from "./components/Employees/Employee";
import InspectionList from "./components/Inspection/InspectionList";
import Inspection from "./components/Inspection/Inspection";
import InventoryList from "./components/Inventory/InventoryList";
import Inventory from "./components/Inventory/Inventory";
import Timebound from "./components/Timebound/Timebound";
import TimeboundList from "./components/Timebound/TimeboundList";
import PriceList from "./components/Price/PriceList";
import Price from "./components/Price/Price";


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
      { path: "booking/create", element: <Booking1 /> },
      { path: "booking1/edit/:id", element: <Booking1 /> },
      { path: "employees", element: <EmployeeList /> },
      { path: "employees/create", element: <Employee /> },
      { path: "employees/edit/:id", element: <Employee /> },
      { path: "inspection", element: <InspectionList /> },
      { path: "inspections/create", element: <Inspection /> },
      { path: "inspections/edit/:id", element: <Inspection /> },
      { path: "inventory", element: <InventoryList /> },
      { path: "inventory/create", element: <Inventory /> },
      { path: "inventory/edit/:id", element: <Inventory /> },
      { path: "timebound", element: <TimeboundList /> },
      { path: "timebound/create", element: <Timebound /> },
      { path: "timebound/edit/:id", element: <Timebound /> },
      { path: "price", element: <PriceList /> },
      { path: "price/create", element: <Price /> },
      { path: "price/edit/:id", element: <Price /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
