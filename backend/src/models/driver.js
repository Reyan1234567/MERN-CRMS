import mongoose from "mongoose";

const driversSchema = new mongoose.Schema({
  driverID: String,
  name: String,
  licenseNumber: String,
  phone: String,
  email: String,
  status: String});

const Drivers = mongoose.model("Drivers", driversSchema);

export default Drivers;
