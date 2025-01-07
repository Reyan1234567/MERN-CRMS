import express from "express";
import Timebounds from "../models/timebound.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const timebounds = await Timebounds.find();
    res.status(200).json(timebounds);
  } catch (err) {
    console.error("Error fetching timebounds:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const timebound = await Timebounds.findById(req.params.id);
    if (!timebound) return res.status(404).send("Timebound not found");
    res.status(200).json(timebound);
  } catch (err) {
    console.error("Error fetching timebound:", err.message);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    const newTimebound = new Timebounds(req.body);
    const result = await newTimebound.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding timebound:", err.message);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Timebounds.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated document
    });
    if (!result) return res.status(404).send("Timebound not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating timebound:", err.message);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Timebounds.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Timebound not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting timebound:", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;
