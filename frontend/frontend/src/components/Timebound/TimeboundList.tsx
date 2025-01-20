import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface TimeboundProps {
  timebound: {
    timeBoundID: String;
    date: String;
    description: String;
    amount: string;
    _id: string;
  };
  deleteTimebound: (id: string) => void;
}

const Timebound = (props: TimeboundProps) => (
  <tr>
    <td>{props.timebound.timeBoundID}</td>
    <td>{props.timebound.date}</td>
    <td>{props.timebound.description}</td>
    <td>{props.timebound.amount}</td>
    <td>
      <div className="d-flex gap-2">
        <Link
          className="btn btn-warning btn-sm"
          to={`/timebound/edit/${props.timebound._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => {
            props.deleteTimebound(props.timebound._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function TimeboundList() {
  const [timebounds, setTimebounds] = useState<TimeboundProps["timebound"][]>(
    []
  );

  useEffect(() => {
    async function getTimebounds() {
      const response = await fetch(`http://localhost:8080/api/timebound/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const timebounds = await response.json();
      setTimebounds(timebounds);
    }
    getTimebounds();
  }, [timebounds.length]);

  async function deleteTimebound(id: any) {
    await fetch(`http://localhost:8080/api/timebound/${id}`, {
      method: "DELETE",
    });
    const newTimebounds = timebounds.filter((el) => {
      return el._id !== id;
    });
    setTimebounds(newTimebounds);
  }

  function timeboundList() {
    return timebounds.map((timebound) => {
      return (
        <Timebound
          timebound={timebound}
          deleteTimebound={() => deleteTimebound(timebound._id)}
          key={timebound._id}
        />
      );
    });
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Timebounds</h3>
        <NavLink className="nav-link" to="/timebound/create">
          <button className="btn btn-outline-secondary">Create Timebound</button>
        </NavLink>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Timebound ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{timeboundList()}</tbody>
        </table>
      </div>
    </>
  );
}
