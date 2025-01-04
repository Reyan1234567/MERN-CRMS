import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface DriverProps {
  driver: {
    driverID: String;
    name: String;
    licenseNumber: String;
    phone: String;
    email: String;
    status: String;
    _id: string;
  };
  deleteDriver: (id: string) => void;
}

const Driver = (props: DriverProps) => (
  <tr>
    <td>{props.driver.driverID}</td>
    <td>{props.driver.name}</td>
    <td>{props.driver.licenseNumber}</td>
    <td>{props.driver.phone}</td>
    <td>{props.driver.email}</td>
    <td>{props.driver.status}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/drivers/edit/${props.driver._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deleteDriver(props.driver._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function VehicleList() {
  const [drivers, setDrivers] = useState<DriverProps["driver"][]>([]);

  useEffect(() => {
    async function getVehicles() {
      const response = await fetch(`http://localhost:8080/api/drivers/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const drivers = await response.json();
      setDrivers(drivers);
    }
    getVehicles();
  }, [drivers.length]);

  async function deleteDriver(id: any) {
    await fetch(`http://localhost:8080/api/drivers/${id}`, {
      method: "DELETE",
    });
    const newDrivers = drivers.filter((el) => {
      return el._id !== id;
    });
    setDrivers(newDrivers);
  }

  function driverList() {
    return drivers.map((driver) => {
      return (
        <Driver
          driver={driver}
          deleteDriver={() => deleteDriver(driver._id)}
          key={driver._id}
        />
      );
    });
  }
  return (
    <>
      <div className="d-flex justify-around">
        <h3 className="mb-4">Drivers</h3>
        <div className="d-flex justify-content-between">
          <h3 className="mb-4">Vehicles</h3>
          <NavLink className="nav-link" to="/drivers/create">
            <button className="btn btn-outline-secondary">Create Driver</button>
          </NavLink>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>driverID</th>
              <th>name</th>
              <th>licenseNumber</th>
              <th>phone</th>
              <th>email</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{driverList()}</tbody>
        </table>
      </div>
    </>
  );
}
