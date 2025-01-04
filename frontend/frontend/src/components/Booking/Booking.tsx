import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Booking() {
  const [form, setForm] = useState({
    bookingID: "",
    vehicleID: "",
    driverID: "",
    startDate: "",
    endDate: "",
    totalPrice: "",
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
      const response = await fetch(`http://localhost:8080/api/booking/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const booking = await response.json();
      if (!booking) {
        console.warn(`Booking with id ${id} not found`);
        navigate("/booking");
        return;
      }
      setForm(booking);
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
    const booking = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        });
      } else {
        response = await fetch(
          `http://localhost:8080/api/booking/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
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
        bookingID: "",
        vehicleID: "",
        driverID: "",
        startDate: "",
        endDate: "",
        totalPrice: "",
        status: "",
      });
      navigate("/booking");
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Booking" : "Update Booking"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Booking Info</h2>
            <p className="text-muted">
              This information will be displayed publicly, so be careful what
              you share.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="bookingID" className="form-label">
              Booking ID
            </label>
            <input
              type="text"
              name="bookingID"
              id="bookingID"
              className="form-control"
              placeholder="Booking ID"
              value={form.bookingID}
              onChange={(e) => updateForm({ bookingID: e.target.value })}
            />
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
            <label htmlFor="driverID" className="form-label">
              Driver ID
            </label>
            <input
              type="text"
              name="driverID"
              id="driverID"
              className="form-control"
              placeholder="Driver ID"
              value={form.driverID}
              onChange={(e) => updateForm({ driverID: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="form-control"
              placeholder="Start Date"
              value={form.startDate}
              onChange={(e) => updateForm({ startDate: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="form-control"
              placeholder="End Date"
              value={form.endDate}
              onChange={(e) => updateForm({ endDate: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="totalPrice" className="form-label">
              Total Price
            </label>
            <input
              type="number"
              name="totalPrice"
              id="totalPrice"
              className="form-control"
              placeholder="Total Price"
              value={form.totalPrice}
              onChange={(e) => updateForm({ totalPrice: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="sr-only">Booking Status</legend>
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

        <button onClick={(e)=>{onSubmit(e)}} type="submit" className="btn btn-primary">
          {isNew ? "Save Booking Record" : "Update Booking Record"}
        </button>
      </form>
    </>
  );
}
