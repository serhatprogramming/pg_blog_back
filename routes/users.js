import express from "express";
const router = express.Router();
import User from "../models/index.js";

router.post("/", async (req, res) => {
  const { username, name } = req.body;
  try {
    const user = await User.create({ username, name });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
