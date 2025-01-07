import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface EmployeeProps {
  employee: {
    userID: String;
    name: String;
    role: String;
    phoneNumber: String;
    email: String;
    status: String;
    _id: string;
  };
  deleteEmployee: (id: string) => void;
}

const Employee = (props: EmployeeProps) => (
  <tr>
    <td>{props.employee.userID}</td>
    <td>{props.employee.name}</td>
    <td>{props.employee.role}</td>
    <td>{props.employee.phoneNumber}</td>
    <td>{props.employee.email}</td>
    <td>{props.employee.status}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/employees/edit/${props.employee._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deleteEmployee(props.employee._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function EmployeeList() {
  const [employees, setEmployees] = useState<EmployeeProps["employee"][]>([]);

  useEffect(() => {
    async function getEmployees() {
      const response = await fetch(`http://localhost:8080/api/employee/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const employees = await response.json();
      setEmployees(employees);
    }
    getEmployees();
  }, [employees.length]);

  async function deleteEmployee(id: any) {
    await fetch(`http://localhost:8080/api/employee/${id}`, {
      method: "DELETE",
    });
    const newEmployees = employees.filter((el) => {
      return el._id !== id;
    });
    setEmployees(newEmployees);
  }

  function employeeList() {
    return employees.map((employee) => {
      return (
        <Employee
          employee={employee}
          deleteEmployee={() => deleteEmployee(employee._id)}
          key={employee._id}
        />
      );
    });
  }
  return (
    <>

        <div className="d-flex justify-content-between">
          <h3 className="mb-4">Employees</h3>
          <NavLink className="nav-link" to="/employees/create">
            <button className="btn btn-outline-secondary">Create Employee</button>
          </NavLink>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>employeeID</th>
              <th>name</th>
              <th>role</th>
              <th>phoneNumber</th>
              <th>email</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{employeeList()}</tbody>
        </table>
      </div>
    </>
  );
}
