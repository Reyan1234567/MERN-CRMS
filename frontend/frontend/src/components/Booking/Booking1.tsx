import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Booking() {
  const [form, setForm] = useState({
    bookingID: "",
    vehicleID: "",
    driverID: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch vehicle price dynamically
  async function getPrice(vehicleID) {
    try {
      const response = await fetch(`http://localhost:8080/api/vehicles/${vehicleID}`);
      if (!response.ok) throw new Error("Failed to fetch vehicle price");

      const vehicle = await response.json();
      return vehicle.price || 0; // Assume `price` field contains the vehicle price
    } catch (error) {
      console.error("Error fetching vehicle price:", error);
      return 0; // Default to 0 if fetching price fails
    }
  }

  const updateForm = (value) =>
    setForm((prev) => ({ ...prev, ...value }));

  const validateForm = () => {
    const newErrors = {};
    if (!form.bookingID.trim()) newErrors.bookingID = "Booking ID is required.";
    if (!form.vehicleID.trim()) newErrors.vehicleID = "Vehicle ID is required.";
    if (!form.driverID.trim()) newErrors.driverID = "Driver ID is required.";
    if (!form.startDate.trim()) newErrors.startDate = "Start date is required.";
    if (!form.endDate.trim()) newErrors.endDate = "End date is required.";
    if (!form.status) newErrors.status = "Status is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
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
        status: "",
      });
      navigate("/booking");
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

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
    async function getDrivers() {
      const response = await fetch("http://localhost:8080/api/drivers");
      const drivers = await response.json();
      setDrivers(drivers);
    }
    getDrivers();
  }, []);

  useEffect(() => {
    async function getVehicles() {
      const response = await fetch("http://localhost:8080/api/vehicles");
      const vehicles = await response.json();
      setVehicles(vehicles);
    }
    getVehicles();
  }, []);




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

          {/* Booking ID */}
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

          {/* Driver Selector */}
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
              {drivers.length > 0 ? (
                drivers.map((driver) => (
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

          {/* Start Date */}
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

          {/* End Date */}
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

          {/* Vehicle Selector */}
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
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle.vehicleID}>
                  {vehicle.name} ({vehicle.vehicleID})
                </option>
              ))}
            </select>
            {errors.vehicleID && (
              <p className="text-danger">{errors.vehicleID}</p>
            )}
          </div>

    

          {/* Booking Status */}
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

