import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleID: String,
  licensePlate: String,
  make: String,
  year: Number,
  mileage: Number,
  isOccupied: Boolean,
  rentalPricePerDay: Number,
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
