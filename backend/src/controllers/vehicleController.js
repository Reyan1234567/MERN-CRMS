import express from "express";
import Vehicle from "../models/Vehicles.js";

const router = express.Router();

// Get all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// Get a single vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).send("Not found");
    res.status(200).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

// Create a new vehicle
router.post("/", async (req, res) => {
  try {
    const newVehicle = Vehicle.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update a vehicle
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Vehicle.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!result) return res.status(404).send("Not found");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete a vehicle
router.delete("/:id", async (req, res) => {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Not found");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;







// const newVehicle = new Vehicle(req.body);
// const result = await newVehicle.save();