import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface InspectionProps {
  inspection: {
    inspectionID: string;
    vehicleID: string;
    date: string;
    inspectorName: string;
    status: string;
    price: number;
    comments: string;
    _id: string;
  };
  deleteInspection: (id: string) => void;
}

const Inspection = (props: InspectionProps) => (
  <tr>
    <td>{props.inspection.inspectionID}</td>
    <td>{props.inspection.vehicleID}</td>
    <td>{new Date(props.inspection.date).toLocaleDateString()}</td>
    <td>{props.inspection.inspectorName}</td>
    <td>{props.inspection.status}</td>
    <td>{props.inspection.price.toFixed(2)}</td>
    <td>{props.inspection.comments}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/inspections/edit/${props.inspection._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deleteInspection(props.inspection._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function InspectionList() {
  const [inspections, setInspections] = useState<InspectionProps["inspection"][]>([]);

  useEffect(() => {
    async function getInspections() {
      const response = await fetch(`http://localhost:8080/api/inspection/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const inspections = await response.json();
      setInspections(inspections);
    }
    getInspections();
  }, [inspections.length]);

  async function deleteInspection(id: string) {
    await fetch(`http://localhost:8080/api/inspection/${id}`, {
      method: "DELETE",
    });
    const newInspections = inspections.filter((el) => el._id !== id);
    setInspections(newInspections);
  }

  function inspectionList() {
    return inspections.map((inspection) => {
      return (
        <Inspection
          inspection={inspection}
          deleteInspection={() => deleteInspection(inspection._id)}
          key={inspection._id}
        />
      );
    });
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Inspections</h3>
        <NavLink className="nav-link" to="/inspections/create">
          <button className="btn btn-outline-secondary">Create Inspection</button>
        </NavLink>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Inspection ID</th>
              <th>Vehicle ID</th>
              <th>Date</th>
              <th>Inspector Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{inspectionList()}</tbody>
        </table>
      </div>
    </>
  );
}
