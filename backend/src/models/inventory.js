import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    inventoryID: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
