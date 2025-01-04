import jwt from 'jsonwebtoken';
import express from "express"
import bcrypt from 'bcrypt';
import Authentication from '../models/authentication.js';

const router = express.Router();

  router.post('/', async (req, res) => {
    const { userID, password, role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
  
    const existingUser = await Authentication.findOne({ userID });
    if (existingUser) {
      return res.status(400).json({ message: 'UserID already in use' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Authentication({
      userID,
      password: hashedPassword,
      role,
    });
  
    try {
        const result = await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  });


export default router