import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true }, 
});

const Employee = mongoose.model('Employee', employeesSchema);

export default Employee;
