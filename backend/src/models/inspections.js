import mongoose from "mongoose";

const inspectionsSchema = new mongoose.Schema({
    inspectionID: { type: String, required: true },
    vehicleID: { type: String, required: true },
    date: { type: Date, required: true },
    inspectorName: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    comments: { type: String, required: true },
});

const Inspections = mongoose.model('Inspections', inspectionsSchema);
export default Inspections;
