import express from "express";
import Inventory from "../models/inventory.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const inventoryItems = await Inventory.find();
      res.status(200).json(inventoryItems);
    } catch (err) {
      console.error("Error fetching inventory items:", err.message);
      res.status(500).send("Error fetching records");
    }
  });

router.get("/hum", async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (err) {
    console.error("Error fetching inventory items:", err.message);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) return res.status(404).send("Inventory item not found");
    res.status(200).json(inventoryItem);
  } catch (err) {
    console.error("Error fetching inventory item:", err.message);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    const newInventoryItem = new Inventory(req.body);
    const result = await newInventoryItem.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding inventory item:", err.message);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const result = await Inventory.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated document
    });
    if (!result) return res.status(404).send("Inventory item not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating inventory item:", err.message);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Inventory.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Inventory item not found");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting inventory item:", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;
