import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Vehicle() {
  const [form, setForm] = useState({
    vehicleID: "",
    licensePlate: "",
    make: "",
    year: "",
    mileage: "",
    isOccupied: "",
    startDate: "",
    endDate: "",
    rentalPricePerDay: "",
  });
  const [isNew, setIsNew] = useState(true);
  const [errors, setErrors] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);

      try {
        const response = await fetch(`http://localhost:8080/api/vehicles/${id}`);
        if (!response.ok) {
          console.error(`An error occurred: ${response.statusText}`);
          return;
        }

        const vehicle = await response.json();
        if (!vehicle) {
          console.warn(`Vehicle with id ${id} not found.`);
          navigate("/vehicles");
          return;
        }
        setForm(vehicle);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};
    if (!form.vehicleID.trim()) newErrors.vehicleID = "Vehicle ID is required.";
    if (!form.licensePlate.trim()) newErrors.licensePlate = "License Plate is required.";
    if (!form.make.trim()) newErrors.make = "Make is required.";
    if (!form.year.trim()) newErrors.year = "Year is required.";
    if (!form.mileage.trim()) newErrors.mileage = "Mileage is required.";
    if (!form.rentalPricePerDay.trim()) newErrors.rentalPricePerDay = "Rental Price Per Day is required.";
    if (!form.isOccupied) newErrors.isOccupied = "Occupied status is required.";
    if (!form.startDate.trim()) newErrors.startDate = "Start Date is required.";
    if (!form.endDate.trim()) newErrors.endDate = "End Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    const vehicle = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:8080/api/vehicles/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicle),
        });
      } else {
        response = await fetch(`http://localhost:8080/api/vehicles/${params.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicle),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setForm({
        vehicleID: "",
        licensePlate: "",
        make: "",
        year: "",
        mileage: "",
        isOccupied: "",
        startDate: "",
        endDate: "",
        rentalPricePerDay: "",
      });
      navigate("/vehicles");
    } catch (error) {
      console.error("Error adding or updating vehicle:", error);
    }
  }

  return (
    <>
      <h3 className="mb-4">{isNew ? "Create Vehicle" : "Update Vehicle"}</h3>
      <form onSubmit={onSubmit} className="container">
        <div className="mb-4">
          <div>
            <h2 className="h4">Vehicle Info</h2>
            <p className="text-muted">
              This information will be displayed publicly, so be careful what you share.
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleID" className="form-label">Vehicle ID</label>
            <input
              type="text"
              id="vehicleID"
              className="form-control"
              placeholder="Vehicle ID"
              value={form.vehicleID}
              onChange={(e) => updateForm({ vehicleID: e.target.value })}
            />
            {errors.vehicleID && <p className="text-danger">{errors.vehicleID}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="licensePlate" className="form-label">License Plate</label>
            <input
              type="text"
              id="licensePlate"
              className="form-control"
              placeholder="License Plate"
              value={form.licensePlate}
              onChange={(e) => updateForm({ licensePlate: e.target.value })}
            />
            {errors.licensePlate && <p className="text-danger">{errors.licensePlate}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="make" className="form-label">Make</label>
            <input
              type="text"
              id="make"
              className="form-control"
              placeholder="Make"
              value={form.make}
              onChange={(e) => updateForm({ make: e.target.value })}
            />
            {errors.make && <p className="text-danger">{errors.make}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="year" className="form-label">Year</label>
            <input
              type="text"
              id="year"
              className="form-control"
              placeholder="Year"
              value={form.year}
              onChange={(e) => updateForm({ year: e.target.value })}
            />
            {errors.year && <p className="text-danger">{errors.year}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="mileage" className="form-label">Mileage</label>
            <input
              type="text"
              id="mileage"
              className="form-control"
              placeholder="Mileage"
              value={form.mileage}
              onChange={(e) => updateForm({ mileage: e.target.value })}
            />
            {errors.mileage && <p className="text-danger">{errors.mileage}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="rentalPricePerDay" className="form-label">Rental Price Per Day</label>
            <input
              type="text"
              id="rentalPricePerDay"
              className="form-control"
              placeholder="Rental Price Per Day"
              value={form.rentalPricePerDay}
              onChange={(e) => updateForm({ rentalPricePerDay: e.target.value })}
            />
            {errors.rentalPricePerDay && <p className="text-danger">{errors.rentalPricePerDay}</p>}
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="sr-only">Occupied Status</legend>
              <div className="form-check form-check-inline">
                <input
                  id="isOccupiedYes"
                  type="radio"
                  value="Occupied"
                  className="form-check-input"
                  checked={form.isOccupied === "Occupied"}
                  onChange={(e) => updateForm({ isOccupied: e.target.value })}
                />
                <label htmlFor="isOccupiedYes" className="form-check-label">Occupied</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="isOccupiedNo"
                  type="radio"
                  value="Not occupied"
                  className="form-check-input"
                  checked={form.isOccupied === "Not occupied"}
                  onChange={(e) => updateForm({ isOccupied: e.target.value })}
                />
                <label htmlFor="isOccupiedNo" className="form-check-label">Not occupied</label>
              </div>
              {errors.isOccupied && <p className="text-danger">{errors.isOccupied}</p>}
            </fieldset>
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={form.startDate}
              onChange={(e) => updateForm({ startDate: e.target.value })}
            />
            {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={form.endDate}
              onChange={(e) => updateForm({ endDate: e.target.value })}
            />
            {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
          </div>


        </div>
        <button type="submit" className="btn btn-primary">
          {isNew ? "Save Vehicle Record" : "Update Vehicle Record"}
        </button>
      </form>
    </>
  );
}






// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function Vehicle() {
//   const [form, setForm] = useState({
//     vehicleID: "",
//     licensePlate: "",
//     make: "",
//     year: "",
//     mileage: "",
//     isOccupied: "",
//     startDate:"",
//     endDate:"",
//     rentalPricePerDay: "",
//   });
//   const [isNew, setIsNew] = useState(true);
//   const [errors, setErrors] = useState({});
//   const params = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchData() {
//       const id = params.id?.toString() || undefined;
//       if (!id) return;
//       setIsNew(false);

//       try {
//         const response = await fetch(`http://localhost:8080/api/vehicles/${id}`);
//         if (!response.ok) {
//           console.error(`An error occurred: ${response.statusText}`);
//           return;
//         }

//         const vehicle = await response.json();
//         if (!vehicle) {
//           console.warn(`Vehicle with id ${id} not found.`);
//           navigate("/vehicles");
//           return;
//         }
//         setForm(vehicle);
//       } catch (error) {
//         console.error("Error fetching vehicle:", error);
//       }
//     }
//     fetchData();
//   }, [params.id, navigate]);

//   function updateForm(value: Partial<typeof form>) {
//     setForm((prev) => ({ ...prev, ...value }));
//   }

//   function validateForm() {
//     const newErrors: Record<string, string> = {};
//     if (!form.vehicleID.trim()) newErrors.vehicleID = "Vehicle ID is required.";
//     if (!form.licensePlate.trim()) newErrors.licensePlate = "License Plate is required.";
//     if (!form.make.trim()) newErrors.make = "Make is required.";
//     if (!form.year.trim()) newErrors.year = "Year is required.";
//     if (!form.mileage.trim()) newErrors.mileage = "Mileage is required.";
//     if (!form.rentalPricePerDay.trim()) newErrors.rentalPricePerDay = "Rental Price Per Day is required.";
//     if (!form.isOccupied) newErrors.isOccupied = "Occupied status is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const vehicle = { ...form };
//     try {
//       let response;
//       if (isNew) {
//         response = await fetch("http://localhost:8080/api/vehicles/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(vehicle),
//         });
//       } else {
//         response = await fetch(`http://localhost:8080/api/vehicles/${params.id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(vehicle),
//         });
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       setForm({
//         vehicleID: "",
//         licensePlate: "",
//         make: "",
//         year: "",
//         mileage: "",
//         isOccupied: "",
//         startDate:"",
//         endDate:"",
//         rentalPricePerDay: "",
//       });
//       navigate("/vehicles");
//     } catch (error) {
//       console.error("Error adding or updating vehicle:", error);
//     }
//   }

//   return (
//     <>
//       <h3 className="mb-4">{isNew ? "Create Vehicle" : "Update Vehicle"}</h3>
//       <form onSubmit={onSubmit} className="container">
//         <div className="mb-4">
//           <div>
//             <h2 className="h4">Vehicle Info</h2>
//             <p className="text-muted">
//               This information will be displayed publicly, so be careful what you share.
//             </p>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="vehicleID" className="form-label">Vehicle ID</label>
//             <input
//               type="text"
//               id="vehicleID"
//               className="form-control"
//               placeholder="Vehicle ID"
//               value={form.vehicleID}
//               onChange={(e) => updateForm({ vehicleID: e.target.value })}
//             />
//             {errors.vehicleID && <p className="text-danger">{errors.vehicleID}</p>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="licensePlate" className="form-label">License Plate</label>
//             <input
//               type="text"
//               id="licensePlate"
//               className="form-control"
//               placeholder="License Plate"
//               value={form.licensePlate}
//               onChange={(e) => updateForm({ licensePlate: e.target.value })}
//             />
//             {errors.licensePlate && <p className="text-danger">{errors.licensePlate}</p>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="make" className="form-label">Make</label>
//             <input
//               type="text"
//               id="make"
//               className="form-control"
//               placeholder="Make"
//               value={form.make}
//               onChange={(e) => updateForm({ make: e.target.value })}
//             />
//             {errors.make && <p className="text-danger">{errors.make}</p>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="year" className="form-label">Year</label>
//             <input
//               type="text"
//               id="year"
//               className="form-control"
//               placeholder="Year"
//               value={form.year}
//               onChange={(e) => updateForm({ year: e.target.value })}
//             />
//             {errors.year && <p className="text-danger">{errors.year}</p>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="mileage" className="form-label">Mileage</label>
//             <input
//               type="text"
//               id="mileage"
//               className="form-control"
//               placeholder="Mileage"
//               value={form.mileage}
//               onChange={(e) => updateForm({ mileage: e.target.value })}
//             />
//             {errors.mileage && <p className="text-danger">{errors.mileage}</p>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="rentalPricePerDay" className="form-label">Rental Price Per Day</label>
//             <input
//               type="text"
//               id="rentalPricePerDay"
//               className="form-control"
//               placeholder="Rental Price Per Day"
//               value={form.rentalPricePerDay}
//               onChange={(e) => updateForm({ rentalPricePerDay: e.target.value })}
//             />
//             {errors.rentalPricePerDay && <p className="text-danger">{errors.rentalPricePerDay}</p>}
//           </div>

//           <div className="mb-4">
//             <fieldset>
//               <legend className="sr-only">Occupied Status</legend>
//               <div className="form-check form-check-inline">
//                 <input
//                   id="isOccupiedYes"
//                   type="radio"
//                   value="Occupied"
//                   className="form-check-input"
//                   checked={form.isOccupied === "Occupied"}
//                   onChange={(e) => updateForm({ isOccupied: e.target.value })}
//                 />
//                 <label htmlFor="isOccupiedYes" className="form-check-label">Occupied</label>
//               </div>
//               <div className="form-check form-check-inline">
//                 <input
//                   id="isOccupiedNo"
//                   type="radio"
//                   value="Not occupied"
//                   className="form-check-input"
//                   checked={form.isOccupied === "Not occupied"}
//                   onChange={(e) => updateForm({ isOccupied: e.target.value })}
//                 />
//                 <label htmlFor="isOccupiedNo" className="form-check-label">Not occupied</label>
//               </div>
//               {errors.isOccupied && <p className="text-danger">{errors.isOccupied}</p>}
//             </fieldset>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {isNew ? "Save Vehicle Record" : "Update Vehicle Record"}
//         </button>
//       </form>
//     </>
//   );
// }
