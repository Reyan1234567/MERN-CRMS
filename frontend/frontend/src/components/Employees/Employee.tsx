import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Employee() {
  const [form, setForm] = useState({
    userID: "",
    name: "",
    role: "",
    phoneNumber: "",
    email: "",
    status: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:8080/api/employee/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const employee = await response.json();
      if (!employee) {
        console.warn(`Employee with id ${id} not found`);
        navigate("/employees");
        return;
      }
      setForm(employee);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value: any) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    const employee = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        });
      } else {
        response = await fetch(
          `http://localhost:8080/api/employee/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
          }
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    } finally {
      setForm({
        userID: "",
        name: "",
        role: "",
        phoneNumber: "",
        email: "",
        status: "",
      });
      navigate("/employees");
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Employee" : "Update Employee"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Employee Info</h2>
            <p className="text-muted">
              This information will be displayed publicly, so be careful what
              you share.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="userID" className="form-label">
              Employee ID
            </label>
            <input
            required
              type="text"
              name="userID"
              id="userID"
              className="form-control"
              placeholder="Employee ID"
              value={form.userID}
              onChange={(e) => updateForm({ userID: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              className="form-control"
              placeholder="Role"
              value={form.role}
              onChange={(e) => updateForm({ role: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              PhoneNumber
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="form-control"
              placeholder="PhoneNumber"
              value={form.phoneNumber}
              onChange={(e) => updateForm({ phoneNumber: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="sr-only">Employee Status</legend>
              <div className="form-check form-check-inline">
                <input
                  id="statusActive"
                  name="status"
                  type="radio"
                  value="Active"
                  className="form-check-input"
                  checked={form.status === "Active"}
                  onChange={(e) => updateForm({ status: e.target.value })}
                />
                <label htmlFor="statusActive" className="form-check-label">
                  Active
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="statusInactive"
                  name="status"
                  type="radio"
                  value="Inactive"
                  className="form-check-input"
                  checked={form.status === "Inactive"}
                  onChange={(e) => updateForm({ status: e.target.value })}
                />
                <label htmlFor="statusInactive" className="form-check-label">
                  Inactive
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <button onClick={(e) => { onSubmit(e); }} type="submit" className="btn btn-primary">
          {isNew ? "Save Employee Record" : "Update Employee Record"}
        </button>
      </form>
    </>
  );
}
