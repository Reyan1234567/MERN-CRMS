import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Authentication from "../models/authentication.js";

const router = express.Router();

const ACT="aslkflq0urq0wij04jg0iherih0eqrhwe0rgh0eafjqwfopifog"

router.post("/", async (req, res) => {
  const { userID, password } = req.body;

  try {
    const user = await Authentication.findOne({ userID });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user._id, userID: user.userID, role: user.role },
      ACT,
      { expiresIn: "1h" }
    );
    

    return res.json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
