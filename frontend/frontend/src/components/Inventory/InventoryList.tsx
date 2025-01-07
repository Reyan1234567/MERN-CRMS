import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface InventoryProps {
  inventory: {
    inventoryID: string;
    amount: number;
    type: string;
    description: string;
    _id: string;
  };
  deleteInventory: (id: string) => void;
}

const Inventory = (props: InventoryProps) => (
  <tr>
    <td>{props.inventory.inventoryID}</td>
    <td>{props.inventory.amount}</td>
    <td>{props.inventory.type}</td>
    <td>{props.inventory.description}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/inventory/edit/${props.inventory._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deleteInventory(props.inventory._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function InventoryList() {
  const [inventories, setInventories] = useState<InventoryProps["inventory"][]>(
    []
  );

  useEffect(() => {
    async function getInventories() {
      const response = await fetch(`http://localhost:8080/api/inventory/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const inventories = await response.json();
      setInventories(inventories);
    }
    getInventories();
  }, [inventories.length]);

  async function deleteInventory(id: any) {
    const token = localStorage.getItem("accessToken");
    await fetch(`http://localhost:8080/api/inventory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const newInventories = inventories.filter((el) => {
      return el._id !== id;
    });
    setInventories(newInventories);
  }

  function inventoryList() {
    return inventories.map((inventory) => {
      return (
        <Inventory
          inventory={inventory}
          deleteInventory={() => deleteInventory(inventory._id)}
          key={inventory._id}
        />
      );
    });
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Inventories</h3>
        <NavLink className="nav-link" to="/inventory/create">
          <button className="btn btn-outline-secondary">Create Inventory</button>
        </NavLink>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Inventory ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{inventoryList()}</tbody>
        </table>
      </div>
    </>
  );
}
