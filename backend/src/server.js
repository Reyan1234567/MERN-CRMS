import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import vehicleRoutes from "./controllers/vehicleController.js"; 
import driverRoutes from "./controllers/driverController.js";
import bookingRoutes from "./controllers/bookingController.js";
import loginRoutes from "./controllers/loginController.js";
import registerRoutes from "./controllers/registerController.js";
import employeeRoutes from "./controllers/employeeController.js";
import inspectionRoutes from "./controllers/inspectionController.js";
import inventoryRoutes from "./controllers/inventoryController.js";
import timeboundRoutes from "./controllers/timeboundController.js";
import priceRoutes from "./controllers/priceController.js";




dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/inspection", inspectionRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/timebound", timeboundRoutes);
app.use("/api/price", priceRoutes);




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
