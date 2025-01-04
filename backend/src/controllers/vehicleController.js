import express from "express";
import Vehicle from "../models/vehicles.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    console.error("Error fetching vehicles:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).send("Vehicle not found");
    res.status(200).json(vehicle);
  } catch (err) {
    console.error("Error fetching vehicle:", err.message);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body); 
    const result = await newVehicle.save();   
    res.status(201).json(result);            
  } catch (err) {
    console.error("Error adding vehicle:", err.message);
    res.status(500).send("Error adding record");
  }
});

// const ACT = "aslkflq0urq0wij04jg0iherih0eqrhwe0rgh0eafjqwfopifog";


router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Vehicle.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!result) return res.status(404).send("Vehicle not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating vehicle:", err.message);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Vehicle not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting vehicle:", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;
