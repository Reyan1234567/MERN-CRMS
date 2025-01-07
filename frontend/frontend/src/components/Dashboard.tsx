import { useEffect, useState } from "react";



export default function Dashboard() {
  const[numberOfCars,setNumberOfCars]=useState(0)
  const[Revenue, setRevenue]=useState(0)
  const[Expense, setExpense]=useState(0)

  
  useEffect(() => {
    async function getExpense() {
      try {
        const response1 = await fetch("http://localhost:8080/api/inspection");
        const response2 = await fetch("http://localhost:8080/api/inventory");

        if (!response1.ok) {
          throw new Error("Failed to fetch inspections data");
        }
        if (!response2.ok) {
          throw new Error("Failed to fetch inventories data");
        }

        const inspections = await response1.json();
        const inventories = await response2.json();

        let totalExpense = 0;

        inspections.forEach((inspection: any) => {
          if (inspection.status === "Passed") {
            totalExpense += inspection.price;
          }
        });

        inventories.forEach((inventory: any) => {
          totalExpense += inventory.amount;
        });

        setExpense(totalExpense);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setExpense(0); // Handle error state
      }
    }

    getExpense();
  }, []);

  useEffect(()=>{
   async function getCars(){
      const num=await fetch("http://localhost:8080/api/vehicles/num")
      const number=await num.json()
      setNumberOfCars(number)
    }
    
    getCars()
  }
  ,[])

  useEffect(() => {
    async function getRevenue() {
      try {
        const response = await fetch("http://localhost:8080/api/booking/sum");
        if (!response.ok) {
          throw new Error("Failed to fetch revenue data");
        }

        const sumbers = await response.json();
        let totalRevenue = 0;

        sumbers.forEach((sumber: any) => {
          if (sumber.status === "Paid") {
            totalRevenue += sumber.totalPrice;
          }
        });

        setRevenue(totalRevenue);
      } catch (error) {
        console.error("Error fetching revenue:", error);
        setRevenue(0); // Set to 0 or handle error state as needed
      }
    }
  getRevenue()},[])
  return (
    <div className="container-fluid">

      {/* Summary Cards */}
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Vehicles</h5>
              <p className="card-text fs-4">{numberOfCars}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <p className="card-text fs-4">{Revenue} ETB</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Inventory and Inspection Expenses</h5>
              <p className="card-text fs-4">{Expense} ETB</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Issues</h5>
              <p className="card-text fs-4">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sales Chart</h5>
              <p className="card-text">[Placeholder for a chart]</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Activities</h5>
              <ul>
                <li>User John Doe signed up</li>
                <li>Order #1234 completed</li>
                <li>Revenue increased by $500</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function num(prevState: undefined): undefined {
  throw new Error("Function not implemented.");
}

