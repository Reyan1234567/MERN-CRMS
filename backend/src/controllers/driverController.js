import express from "express";
import Drivers from "../models/Drivers.js";

const router = express.Router();

// Get all Drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Drivers.find();
    res.status(200).json(drivers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// Get a single driver by ID
router.get("/:id", async (req, res) => {
  try {
    const driver = await Drivers.findById(req.params.id);
    if (!driver) return res.status(404).send("Not found");
    res.status(200).json(driver);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

// Create a new driver
router.post('/', async (req, res) => {
    try {
      const newDriver = new Drivers(req.body);
      const result = await newDriver.save();
      res.status(201).json(result);
    } catch (err) {
      console.error("Error adding record:", err.message); // Log the specific error message
      res.status(500).send('Error adding record');
    }
  });

// Update a driver
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Drivers.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!result) return res.status(404).send("Not found");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete a Driver
router.delete("/:id", async (req, res) => {
  try {
    const result = await Drivers.findByIdAndDelete(req.params.id);
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