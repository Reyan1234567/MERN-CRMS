import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Vehicle() {
  const [form, setForm] = useState({
    vehicleID: "",
    licensePlate: "",
    make: "",
    year: "",
    mileage: "",
    isOccupied: "",
    rentalPricePerDay: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:8080/api/vehicles/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const vehicle = await response.json();
      if (!vehicle) {
        console.warn(`Vehicle with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(vehicle);
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
    const vehicle = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/vehicles/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicle),
        });
      } else {
        response = await fetch(
          `http://localhost:8080/api/vehicles/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicle),
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
        vehicleID: "",
        licensePlate: "",
        make: "",
        year: "",
        mileage: "",
        isOccupied: "",
        rentalPricePerDay: "",
      });
      navigate("/");
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Vehicle" : "Update Vehicle"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Vehicle Info</h2>
            <p className="text-muted">
              This information will be displayed publicly, so be careful what
              you share.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="vehicleID" className="form-label">
              Vehicle ID
            </label>
            <input
              type="text"
              name="vehicleID"
              id="vehicleID"
              className="form-control"
              placeholder="Vehicle ID"
              value={form.vehicleID}
              onChange={(e) => updateForm({ vehicleID: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="licensePlate" className="form-label">
              License Plate
            </label>
            <input
              type="text"
              name="licensePlate"
              id="licensePlate"
              className="form-control"
              placeholder="License Plate"
              value={form.licensePlate}
              onChange={(e) => updateForm({ licensePlate: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="make" className="form-label">
              Make
            </label>
            <input
              type="text"
              name="make"
              id="make"
              className="form-control"
              placeholder="Make"
              value={form.make}
              onChange={(e) => updateForm({ make: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="text"
              name="year"
              id="year"
              className="form-control"
              placeholder="Year"
              value={form.year}
              onChange={(e) => updateForm({ year: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mileage" className="form-label">
              Mileage
            </label>
            <input
              type="text"
              name="mileage"
              id="mileage"
              className="form-control"
              placeholder="Mileage"
              value={form.mileage}
              onChange={(e) => updateForm({ mileage: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rentalPricePerDay" className="form-label">
              Rental Price Per Day
            </label>
            <input
              type="text"
              name="rentalPricePerDay"
              id="rentalPricePerDay"
              className="form-control"
              placeholder="Rental Price Per Day"
              value={form.rentalPricePerDay}
              onChange={(e) => updateForm({ rentalPricePerDay: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="sr-only">Occupied Status</legend>
              <div className="form-check form-check-inline">
                <input
                  id="isOccupiedYes"
                  name="isOccupied"
                  type="radio"
                  value="Yes"
                  className="form-check-input"
                  checked={form.isOccupied === "Yes"}
                  onChange={(e) => updateForm({ isOccupied: e.target.value })}
                />
                <label htmlFor="isOccupiedYes" className="form-check-label">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="isOccupiedNo"
                  name="isOccupied"
                  type="radio"
                  value="No"
                  className="form-check-input"
                  checked={form.isOccupied === "No"}
                  onChange={(e) => updateForm({ isOccupied: e.target.value })}
                />
                <label htmlFor="isOccupiedNo" className="form-check-label">
                  No
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isNew ? "Save Vehicle Record" : "Update Vehicle Record"}
        </button>
      </form>
    </>
  );
}





