import express from "express";
import Drivers from "../models/driver.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const drivers = await Drivers.find();
    res.status(200).json(drivers);
  } catch (err) {
    console.error("Error fetching drivers:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const driver = await Drivers.findById(req.params.id);
    if (!driver) return res.status(404).send("Driver not found");
    res.status(200).json(driver);
  } catch (err) {
    console.error("Error fetching driver:", err.message);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    const newDriver = new Drivers(req.body);
    const result = await newDriver.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding driver:", err.message);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Drivers.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!result) return res.status(404).send("Driver not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating driver:", err.message);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Drivers.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Driver not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting driver:", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;
