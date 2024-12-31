import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
    employeeID: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true }, // e.g., "Active" or "Inactive"
});

const Employees = mongoose.model('Employees', employeesSchema);

module.exports = Employees;
