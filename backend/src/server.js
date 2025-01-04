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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
