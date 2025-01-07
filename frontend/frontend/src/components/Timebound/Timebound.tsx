import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Timebound() {
  const [form, setForm] = useState({
    timeBoundID: "",
    date: "",
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
      const response = await fetch(`http://localhost:8080/api/timebound/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const timebound = await response.json();
      if (!timebound) {
        console.warn(`Timebound with id ${id} not found`);
        navigate("/timebounds");
        return;
      }
      setForm(timebound);
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
    const timebound = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/timebound", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(timebound),
        });
      } else {
        response = await fetch(
          `http://localhost:8080/api/timebound/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(timebound),
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
        timeBoundID: "",
        date: "",
        description: "",
      });
      navigate("/timebounds");
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Timebound" : "Update Timebound"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Timebound Info</h2>
            <p className="text-muted">
              Provide details about the time-bound event.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="timeBoundID" className="form-label">
              Timebound ID
            </label>
            <input
              type="text"
              name="timeBoundID"
              id="timeBoundID"
              className="form-control"
              placeholder="Timebound ID"
              value={form.timeBoundID}
              onChange={(e) => updateForm({ timeBoundID: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              value={form.date}
              onChange={(e) => updateForm({ date: e.target.value })}
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

        <button type="submit" className="btn btn-primary">
          {isNew ? "Save Timebound Record" : "Update Timebound Record"}
        </button>
      </form>
    </>
  );
}
