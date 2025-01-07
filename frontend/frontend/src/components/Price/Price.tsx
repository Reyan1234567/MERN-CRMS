import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Price() {
  const [form, setForm] = useState({
    priceID: "",
    vehicleID: "",
    rentalPricePerDay: 0,
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:8080/api/price/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const price = await response.json();
      if (!price) {
        console.warn(`Price with id ${id} not found`);
        navigate("/price");
        return;
      }
      setForm(price);
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
    const price = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(price),
        });
      } else {
        response = await fetch(
          `http://localhost:8080/api/price/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(price),
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
        priceID: "",
        vehicleID: "",
        rentalPricePerDay: 0,
      });
      navigate("/price");
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Price" : "Update Price"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Price Info</h2>
            <p className="text-muted">
              This information is used for rental pricing management.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="priceID" className="form-label">
              Price ID
            </label>
            <input
              required
              type="text"
              name="priceID"
              id="priceID"
              className="form-control"
              placeholder="Price ID"
              value={form.priceID}
              onChange={(e) => updateForm({ priceID: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="vehicleID" className="form-label">
              Vehicle ID
            </label>
            <input
              required
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
            <label htmlFor="rentalPricePerDay" className="form-label">
              Rental Price Per Day
            </label>
            <input
              required
              type="number"
              name="rentalPricePerDay"
              id="rentalPricePerDay"
              className="form-control"
              placeholder="Rental Price Per Day"
              value={form.rentalPricePerDay}
              onChange={(e) =>
                updateForm({ rentalPricePerDay: parseFloat(e.target.value) })
              }
            />
          </div>
        </div>

        <button onClick={(e) => { onSubmit(e); }} type="submit" className="btn btn-primary">
          {isNew ? "Save Price Record" : "Update Price Record"}
        </button>
      </form>
    </>
  );
}
