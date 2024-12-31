import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface VehicleProps {
  vehicle: {
    vehicleID: string;
    licensePlate: string;
    make: string;
    year: number;
    mileage: number;
    isOccupied: boolean;
    rentalPricePerDay: number;
    _id: string;
  };
  deleteVehicle: (id: string) => void;
}

const Vehicle = (props: VehicleProps) => (
  <tr>
    <td>{props.vehicle.vehicleID}</td>
    <td>{props.vehicle.licensePlate}</td>
    <td>{props.vehicle.make}</td>
    <td>{props.vehicle.year}</td>
    <td>{props.vehicle.mileage}</td>
    <td>{props.vehicle.isOccupied ? "Occupied" : "Available"}</td>
    <td>{props.vehicle.rentalPricePerDay}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/edit/${props.vehicle._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deleteVehicle(props.vehicle._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<VehicleProps["vehicle"][]>([]);

  useEffect(() => {
    async function getVehicles() {
      const response = await fetch(`http://localhost:8080/api/vehicles/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const vehicle = await response.json();
      setVehicles(vehicle);
    }
    getVehicles();
  }, [vehicles.length]);

  async function deleteVehicle(id: any) {
    await fetch(`http://localhost:8080/api/vehicles/${id}`, {
      method: "DELETE",
    });
    const newVehicles = vehicles.filter((el) => {
      return el._id !== id;
    });
    setVehicles(newVehicles);
  }

  function vehicleList() {
    return vehicles.map((vehicle) => {
      return (
        <Vehicle
          vehicle={vehicle}
          deleteVehicle={() => deleteVehicle(vehicle._id)}
          key={vehicle._id}
        />
      );
    });
  }

  return (
    <>
      <h3 className="mb-4">Vehicles</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>vehicleID</th>
              <th>licensePlate</th>
              <th>make</th>
              <th>year</th>
              <th>mileage</th>
              <th>isOccupied</th>
              <th>rentalPricePerDay</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{vehicleList()}</tbody>
        </table>
      </div>
    </>
  );
}


























































