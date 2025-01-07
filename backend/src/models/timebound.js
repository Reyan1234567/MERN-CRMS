import mongoose from "mongoose";

const timeboundSchema = new mongoose.Schema({
    timeBoundID: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
});

const Timebound = mongoose.model('Timebound', timeboundSchema);

export default Timebound;
