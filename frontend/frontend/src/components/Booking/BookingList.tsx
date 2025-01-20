import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface BookingProps {
  booking: {
    bookingID: String;
    vehicleID: String;
    driverID: String;
    startDate: Date;
    endDate: Date;
    status: String;
    _id: string;
  };
  deleteBooking: (id: string) => void;
}
const token = localStorage.getItem("accessToken");
const Booking = (props: BookingProps) => (
  <tr>
    <td>{props.booking.bookingID}</td>
    <td>{props.booking.vehicleID}</td>
    <td>{props.booking.driverID}</td>
    <td>{new Date(props.booking.startDate).toLocaleDateString()}</td>
    <td>{new Date(props.booking.endDate).toLocaleDateString()}</td>
    <td>{props.booking.status}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/booking1/edit/${props.booking._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deleteBooking(props.booking._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function BookingList() {
  const [bookings, setBookings] = useState<BookingProps["booking"][]>([]);

  useEffect(() => {
    async function getBookings() {
      const response = await fetch(`http://localhost:8080/api/booking`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const bookings = await response.json();
      setBookings(bookings);
    }
    getBookings();
  }, [bookings.length]);

  async function deleteBooking(id: any) {
    await fetch(`http://localhost:8080/api/booking/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const newBookings = bookings.filter((el) => {
      return el._id !== id;
    });
    setBookings(newBookings);
  }

  function bookingList() {
    return bookings.map((booking) => {
      return (
        <Booking
          booking={booking}
          deleteBooking={() => deleteBooking(booking._id)}
          key={booking._id}
        />
      );
    });
  }

  return (
    <>
        <div className="d-flex justify-content-between">
        <h3 className="mb-4">Bookings</h3>
          <NavLink className="nav-link" to="/booking/create">
            <button className="btn btn-outline-secondary">Create Booking</button>
          </NavLink>
        </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Booking ID</th>
              <th>Vehicle ID</th>
              <th>Driver ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{bookingList()}</tbody>
        </table>
      </div>
    </>
  );
}
