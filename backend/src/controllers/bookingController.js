import express from 'express';
import Booking from '../models/bookings.js';
import authenticateToken from "../middlewares/authenticateToken.js"
import authorizeRole from "../middlewares/authorizeRole.js"


const router = express.Router();

router.get('/sum', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching records');
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching records');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send('Not found');
    res.status(200).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching record');
  }
});

router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const result = await newBooking.save();
    res.status(201).json(result);
  } catch (err) {
    console.error('Error adding record:', err.message);
    res.status(500).send('Error adding record');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const result = await Booking.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!result) return res.status(404).send('Not found');
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating record');
  }
});

router.delete('/:id',authenticateToken,authorizeRole("user"),async (req, res) => {
  try {
    const result = await Booking.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('Not found');
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting record');
  }
});

export default router;
