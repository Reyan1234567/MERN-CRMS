import express from "express";
import Employees from "../models/employees.js";
import Authentication from "../models/authentication.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employees = await Employees.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err.message);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    const { userID, ...employeeData } = req.body;

    const userInAuth = await Authentication.findOne({ userID });
    if (!userInAuth) {
      return res.status(404).send("User not found in authentication");
    }

    const existingEmployee = await Employees.findOne({ userID });
    if (existingEmployee) {
      return res.status(409).send("Employee with this userID already exists");
    }

    const newEmployee = new Employees({ userID, ...employeeData });
    const result = await newEmployee.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding employee:", err.message);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Employees.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated document
    });
    if (!result) return res.status(404).send("Employee not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating employee:", err.message);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Employees.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Employee not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting employee:", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;
