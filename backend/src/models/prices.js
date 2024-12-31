import mongoose from "mongoose";

const pricesSchema = new mongoose.Schema({
    priceID: { type: String, required: true },
    vehicleID: { type: String, required: true },
    rentalPricePerDay: { type: Number, required: true },
});

const Prices = mongoose.model('Prices', pricesSchema);

module.exports = Prices;
