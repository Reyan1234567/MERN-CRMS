import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Line } from "react-chartjs-2"; // Importing Chart.js for the chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [timeboundSum, setTimeboundSum] = useState(0);
  const [Revenue, setRevenue] = useState(0);
  const [Expense, setExpense] = useState(0);

  // Fetch Expense Data
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
        setExpense(0);
      }
    }

    getExpense();
  }, []);

  // Fetch Number of Cars
  useEffect(() => {
    async function getCars() {
      const num = await fetch("http://localhost:8080/api/vehicles/num");
      const number = await num.json();
      setNumberOfCars(number);
    }

    getCars();
  }, []);

  // Fetch Revenue Data
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
    getRevenue();
  }, []);

  // Fetch Timebound Data
  useEffect(() => {
    async function getTimebounds() {
      try {
        const response = await fetch("http://localhost:8080/api/timebound");
        if (!response.ok) {
          console.error("Failed to fetch data");
          return;
        }
        const sums = await response.json();

        let total = 0;
        sums.forEach((sum: any) => (total += sum.amount));

        setTimeboundSum(total);
      } catch (error) {
        console.error("Error fetching time bounds:", error);
      }
    }

    getTimebounds();
  }, []);

  const chartData = {
    labels: ["Revenue", "Expense", "Timebound Expenses"],
    datasets: [
      {
        label: "Amount (ETB)",
        data: [253000, Expense, timeboundSum * 12],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

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
              <p className="card-text fs-4">253000 ETB</p>
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
              <h5 className="card-title">Timebound Expenses</h5>
              <p className="card-text fs-4">{timeboundSum * 12} ETB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="row">
        <div className="col-lg-12 mb-4" id="chart">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sales Chart</h5>
              <Line data={chartData} /> {/* Rendering the chart */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
