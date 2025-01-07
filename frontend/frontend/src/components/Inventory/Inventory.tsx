import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Inventory() {
  const [form, setForm] = useState({
    inventoryID: "",
    amount: "",
    type: "",
    description: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:8080/api/inventory/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const inventory = await response.json();
      if (!inventory) {
        console.warn(`Inventory with id ${id} not found`);
        navigate("/inventory");
        return;
      }
      setForm(inventory);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value:any) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e:any) {
    e.preventDefault();
    const inventory = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/inventory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inventory),
        });
      } else {
        response = await fetch(
          `http://localhost:8080/api/inventory/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inventory),
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
        inventoryID: "",
        amount: "",
        type: "",
        description: "",
      });
      navigate("/inventory");
    }
  }

  return (
    <>
      <h3 className="mb-4">
        {isNew ? "Create Inventory Record" : "Update Inventory Record"}
      </h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Inventory Info</h2>
            <p className="text-muted">
              This information will be displayed publicly, so be careful what
              you share.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="inventoryID" className="form-label">
              Inventory ID
            </label>
            <input
              type="text"
              name="inventoryID"
              id="inventoryID"
              className="form-control"
              placeholder="Inventory ID"
              value={form.inventoryID}
              onChange={(e) => updateForm({ inventoryID: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-control"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => updateForm({ amount: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <input
              type="text"
              name="type"
              id="type"
              className="form-control"
              placeholder="Type"
              value={form.type}
              onChange={(e) => updateForm({ type: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
            ></textarea>
          </div>
        </div>

        <button
          onClick={(e) => {
            onSubmit(e);
          }}
          type="submit"
          className="btn btn-primary"
        >
          {isNew ? "Save Inventory Record" : "Update Inventory Record"}
        </button>
      </form>
    </>
  );
}
