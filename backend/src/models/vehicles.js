import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleID: { type: String, required: true },
  licensePlate: { type: String, required: true },
  make: { type: String, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number, required: true },
  isOccupied: { type: String },
  startDate:{type: Date},
  endDate:{type: Date},
  rentalPricePerDay: { type: Number, required: true },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
