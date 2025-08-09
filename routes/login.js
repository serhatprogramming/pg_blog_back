import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();
import { jwtSecret } from "../util/config.js";
import models from "../models/index.js";
const { User } = models;

router.post("/", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  // Continue with login logic (e.g., password verification, token generation)
  if (!req.body.password || req.body.password !== "secret") {
    return res.status(400).json({ error: "Invalid password" });
  }
  // If password is valid, generate a JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: "1h",
  });
  res.json({ token, user: { id: user.id, username: user.username } });
});

export default router;
