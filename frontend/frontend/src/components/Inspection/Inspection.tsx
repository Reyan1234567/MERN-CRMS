import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Inspection() {
  const [form, setForm] = useState({
    inspectionID: "",
    vehicleID: "",
    date: "",
    inspectorName: "",
    status: "",
    price: "",
    comments: "",
  });
  const [errors, setErrors] = useState({});
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:8080/api/inspection/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }
      const inspection = await response.json();
      if (!inspection) {
        console.warn(`Inspection with id ${id} not found`);
        navigate("/inspections");
        return;
      }
      setForm(inspection);
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value: any) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  function validateForm() {
    const currentErrors: any = {};
    if (!form.inspectionID) currentErrors.inspectionID = "Inspection ID is required.";
    if (!form.vehicleID) currentErrors.vehicleID = "Vehicle ID is required.";
    if (!form.date) currentErrors.date = "Date is required.";
    if (!form.inspectorName) currentErrors.inspectorName = "Inspector Name is required.";
    if (!form.status) currentErrors.status = "Status is required.";
    if (!form.price || Number(form.price) <= 0) currentErrors.price = "Price must be greater than 0.";
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = isNew
        ? await fetch("http://localhost:8080/api/inspection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch(`http://localhost:8080/api/inspection/${params.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    } finally {
      setForm({
        inspectionID: "",
        vehicleID: "",
        date: "",
        inspectorName: "",
        status: "",
        price: "",
        comments: "",
      });
      navigate("/inspection");
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Inspection" : "Update Inspection"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <h2 className="h4">Inspection Info</h2>
          <p className="text-muted">
            This information will be recorded for the vehicle inspection process.
          </p>

          {[
            { name: "inspectionID", label: "Inspection ID", type: "text" },
            { name: "vehicleID", label: "Vehicle ID", type: "text" },
            { name: "date", label: "Date", type: "date" },
            { name: "inspectorName", label: "Inspector Name", type: "text" },
            { name: "price", label: "Price", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name} className="mb-3">
              <label htmlFor={name} className="form-label">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                placeholder={label}
                value={(form as any)[name]}
                onChange={(e) => updateForm({ [name]: e.target.value })}
              />
              {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
            </div>
          ))}

          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comments
            </label>
            <textarea
              name="comments"
              id="comments"
              className={`form-control ${errors.comments ? "is-invalid" : ""}`}
              placeholder="Additional Comments"
              value={form.comments}
              onChange={(e) => updateForm({ comments: e.target.value })}
            ></textarea>
            {errors.comments && <div className="invalid-feedback">{errors.comments}</div>}
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="sr-only">Inspection Status</legend>
              {["Paid", "Unpaid"].map((status) => (
                <div key={status} className="form-check form-check-inline">
                  <input
                    id={`status${status}`}
                    name="status"
                    type="radio"
                    value={status}
                    className="form-check-input"
                    checked={form.status === status}
                    onChange={(e) => updateForm({ status: e.target.value })}
                  />
                  <label htmlFor={`status${status}`} className="form-check-label">
                    {status}
                  </label>
                </div>
              ))}
            </fieldset>
            {errors.status && <div className="text-danger">{errors.status}</div>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isNew ? "Save Inspection Record" : "Update Inspection Record"}
        </button>
      </form>
    </>
  );
}
