import express from "express";
import Prices from "../models/prices.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prices = await Prices.find();
    res.status(200).json(prices);
  } catch (err) {
    console.error("Error fetching prices:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const price = await Prices.findById(req.params.id);
    if (!price) return res.status(404).send("Price not found");
    res.status(200).json(price);
  } catch (err) {
    console.error("Error fetching price:", err.message);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    const newPrice = new Prices(req.body);
    const result = await newPrice.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding price:", err.message);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Prices.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated document
    });
    if (!result) return res.status(404).send("Price not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating price:", err.message);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Prices.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Price not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting price:", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;
