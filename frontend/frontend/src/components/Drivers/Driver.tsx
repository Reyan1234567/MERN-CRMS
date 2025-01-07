import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Driver() {
  const [form, setForm] = useState({
    driverID: "",
    name: "",
    licenseNumber: "",
    phone: "",
    email: "",
    status: "",
  });
  const [isNew, setIsNew] = useState(true);
  const [errors, setErrors] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:8080/api/drivers/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const driver = await response.json();
      if (!driver) {
        console.warn(`Driver with id ${id} not found`);
        navigate("/drivers");
        return;
      }
      setForm(driver);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({
      ...prev,
      ...value,
    }));
  }

  function validateForm() {
    const newErrors = {};
    if (!form.driverID.trim()) newErrors.driverID = "Driver ID is required.";
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.licenseNumber.trim())
      newErrors.licenseNumber = "License Number is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.status) newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const driver = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/drivers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driver),
        });
      } else {
        response = await fetch(
          `http://localhost:8080/api/drivers/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(driver),
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
        driverID: "",
        name: "",
        licenseNumber: "",
        phone: "",
        email: "",
        status: "",
      });
      navigate("/drivers");
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Driver" : "Update Driver"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Driver Info</h2>
            <p className="text-muted">
              This information will be displayed publicly, so be careful what
              you share.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="driverID" className="form-label">
              Driver ID
            </label>
            <input
              type="text"
              name="driverID"
              id="driverID"
              className={`form-control ${errors.driverID ? "is-invalid" : ""}`}
              placeholder="Driver ID"
              value={form.driverID}
              onChange={(e) => updateForm({ driverID: e.target.value })}
            />
            {errors.driverID && (
              <div className="invalid-feedback">{errors.driverID}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="licenseNumber" className="form-label">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              id="licenseNumber"
              className={`form-control ${
                errors.licenseNumber ? "is-invalid" : ""
              }`}
              placeholder="License Number"
              value={form.licenseNumber}
              onChange={(e) => updateForm({ licenseNumber: e.target.value })}
            />
            {errors.licenseNumber && (
              <div className="invalid-feedback">{errors.licenseNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => updateForm({ phone: e.target.value })}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="sr-only">Driver Status</legend>
              <div className="form-check form-check-inline">
                <input
                  id="statusAssigned"
                  name="status"
                  type="radio"
                  value="Assigned"
                  className="form-check-input"
                  checked={form.status === "Assigned"}
                  onChange={(e) => updateForm({ status: e.target.value })}
                />
                <label htmlFor="statusAssigned" className="form-check-label">
                  Assigned
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="statusNotAssigned"
                  name="status"
                  type="radio"
                  value="NotAssigned"
                  className="form-check-input"
                  checked={form.status === "NotAssigned"}
                  onChange={(e) => updateForm({ status: e.target.value })}
                />
                <label htmlFor="statusNotAssigned" className="form-check-label">
                  NotAssigned
                </label>
              </div>
              {errors.status && (
                <div className="text-danger mt-2">{errors.status}</div>
              )}
            </fieldset>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isNew ? "Save Driver Record" : "Update Driver Record"}
        </button>
      </form>
    </>
  );
}
