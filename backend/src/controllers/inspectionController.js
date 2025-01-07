import express from "express";
import Inspections from "../models/inspections.js";

const router = express.Router();

router.get("/hum", async (req, res) => {
  try {
    const inspections = await Inspections.find();
    res.status(200).json(inspections);
  } catch (err) {
    console.error("Error fetching inspections:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/", async (req, res) => {
  try {
    const inspections = await Inspections.find();
    res.status(200).json(inspections);
  } catch (err) {
    console.error("Error fetching inspections:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const inspection = await Inspections.findById(req.params.id);
    if (!inspection) return res.status(404).send("Inspection not found");
    res.status(200).json(inspection);
  } catch (err) {
    console.error("Error fetching inspection:", err.message);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    const newInspection = new Inspections(req.body);
    const result = await newInspection.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding inspection:", err.message);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Inspections.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated document
    });
    if (!result) return res.status(404).send("Inspection not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating inspection:", err.message);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Inspections.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Inspection not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting inspection:", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;
