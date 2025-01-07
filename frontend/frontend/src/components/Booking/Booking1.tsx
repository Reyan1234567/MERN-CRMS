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
  const [vehicles, setvehicles] = useState([]);
  const [drivers, setdrivers] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    setIsNew(false);
    async function fetchBooking() {
      try {
        const response = await fetch(`http://localhost:8080/api/booking/${id}`);
        if (!response.ok) throw new Error(response.statusText);

        const booking = await response.json();
        if (!booking) {
          console.warn(`Booking with ID ${id} not found.`);
          navigate("/booking");
          return;
        }
        setForm(booking);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    }

    fetchBooking();
  }, [id, navigate]);

  useEffect(() => {
    async function getdrivers() {
      const response = await fetch("http://localhost:8080/api/drivers");
      const Drivers = await response.json();
      setdrivers(Drivers);
    }
    getdrivers();
  }, []);

  useEffect(() => {
    async function getvehicles() {
      const response = await fetch("http://localhost:8080/api/vehicles");
      const Vehicles = await response.json();
      setvehicles(Vehicles);
    }
    getvehicles();
  }, []);

  const updateForm = (value: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...value }));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.bookingID.trim()) newErrors.bookingID = "Booking ID is required.";
    if (!form.vehicleID.trim()) newErrors.vehicleID = "Vehicle ID is required.";
    if (!form.driverID.trim()) newErrors.driverID = "Driver ID is required.";
    if (!form.startDate.trim()) newErrors.startDate = "Start date is required.";
    if (!form.endDate.trim()) newErrors.endDate = "End date is required.";
    if (!form.totalPrice) newErrors.totalPrice = "Total price is required.";
    if (!form.status) newErrors.status = "Status is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const method = isNew ? "POST" : "PATCH";
      const endpoint = isNew
        ? "http://localhost:8080/api/booking"
        : `http://localhost:8080/api/booking/${id}`;
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
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
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Booking" : "Update Booking"}</h3>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-4">
          <h2 className="h4">Booking Info</h2>
          <p className="text-muted">
            This information will be displayed publicly, so be careful what you
            share.
          </p>

          <div className="mb-3">
            <label htmlFor="bookingID" className="form-label">
              Booking ID
            </label>
            <input
              type="text"
              id="bookingID"
              className="form-control"
              placeholder="Booking ID"
              value={form.bookingID}
              onChange={(e) => updateForm({ bookingID: e.target.value })}
            />
            {errors.bookingID && (
              <p className="text-danger">{errors.bookingID}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="driverID" className="form-label">
              Driver ID
            </label>
            <select
              id="driverID"
              className="form-select"
              value={form.driverID}
              onChange={(e) => updateForm({ driverID: e.target.value })}
            >
              <option value="">Select a Driver</option>
              {Array.isArray(drivers) && drivers.length > 0 ? (
                drivers.map((driver: any) => (
                  <option key={driver._id} value={driver.driverID}>
                    {driver.name} ({driver.driverID})
                  </option>
                ))
              ) : (
                <option disabled>No drivers available</option>
              )}
            </select>

            {errors.driverID && (
              <p className="text-danger">{errors.driverID}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={form.startDate}
              onChange={(e) => updateForm({ startDate: e.target.value })}
            />
            {errors.startDate && (
              <p className="text-danger">{errors.startDate}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={form.endDate}
              onChange={(e) => updateForm({ endDate: e.target.value })}
            />
            {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="vehicleID" className="form-label">
              Vehicle ID
            </label>
            <select
              id="vehicleID"
              className="form-select"
              value={form.vehicleID}
              onChange={(e) => updateForm({ vehicleID: e.target.value })}
            >
              <option value="">Select a Vehicle</option>
              {vehicles
                .filter((vehicle) => {
                  // Convert `vehicle.endDate` and `form.startDate` to Date objects for comparison
                  const vehicleEndDate = new Date(vehicle.endDate);
                  const formStartDate = new Date(form.startDate);
                  return vehicleEndDate < formStartDate;
                })
                .map((vehicle) => (
                  <option key={vehicle._id} value={vehicle.vehicleID}>
                    {vehicle.name} ({vehicle.vehicleID})
                  </option>
                ))}
            </select>
            {errors.vehicleID && (
              <p className="text-danger">{errors.vehicleID}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="totalPrice" className="form-label">
              Total Price
            </label>
            <p id="totalPrice" className="form-control-plaintext">
              {form.totalPrice ? `$${form.totalPrice}` : "Not calculated yet"}
            </p>
            {errors.totalPrice && (
              <p className="text-danger">{errors.totalPrice}</p>
            )}
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="sr-only">Booking Status</legend>
              <div className="form-check form-check-inline">
                <input
                  id="statusPaid"
                  name="status"
                  type="radio"
                  value="Paid"
                  className="form-check-input"
                  checked={form.status === "Paid"}
                  onChange={(e) => updateForm({ status: e.target.value })}
                />
                <label htmlFor="statusPaid" className="form-check-label">
                  Paid
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="statusUnpaid"
                  name="status"
                  type="radio"
                  value="Unpaid"
                  className="form-check-input"
                  checked={form.status === "Unpaid"}
                  onChange={(e) => updateForm({ status: e.target.value })}
                />
                <label htmlFor="statusUnpaid" className="form-check-label">
                  Unpaid
                </label>
              </div>
              {errors.status && <p className="text-danger">{errors.status}</p>}
            </fieldset>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isNew ? "Save Booking Record" : "Update Booking Record"}
        </button>
      </form>
    </>
  );
}
