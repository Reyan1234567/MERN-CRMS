// models/Authentication.js
import mongoose from 'mongoose';

const authenticationSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const Authentication = mongoose.model('Authentication', authenticationSchema);

export default Authentication;
