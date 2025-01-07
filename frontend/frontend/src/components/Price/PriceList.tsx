import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface PriceProps {
  price: {
    priceID: string;
    vehicleID: string;
    rentalPricePerDay: number;
    _id: string;
  };
  deletePrice: (id: string) => void;
}

const Price = (props: PriceProps) => (
  <tr>
    <td>{props.price.priceID}</td>
    <td>{props.price.vehicleID}</td>
    <td>{props.price.rentalPricePerDay}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/price/edit/${props.price._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deletePrice(props.price._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function PriceList() {
  const [prices, setPrices] = useState<PriceProps["price"][]>([]);

  useEffect(() => {
    async function getPrices() {
      const response = await fetch(`http://localhost:8080/api/price/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const prices = await response.json();
      setPrices(prices);
    }
    getPrices();
  }, [prices.length]);

  async function deletePrice(id: string) {
    await fetch(`http://localhost:8080/api/price/${id}`, {
      method: "DELETE",
    });
    const newPrices = prices.filter((el) => el._id !== id);
    setPrices(newPrices);
  }

  function priceList() {
    return prices.map((price) => {
      return (
        <Price
          price={price}
          deletePrice={() => deletePrice(price._id)}
          key={price._id}
        />
      );
    });
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Prices</h3>
        <NavLink className="nav-link" to="/price/create">
          <button className="btn btn-outline-secondary">Create Price</button>
        </NavLink>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Price ID</th>
              <th>Vehicle ID</th>
              <th>Rental Price Per Day</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{priceList()}</tbody>
        </table>
      </div>
    </>
  );
}
