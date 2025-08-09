import express from "express";
const router = express.Router();
import model from "../models/index.js";
const { User, Blog } = model;

router.post("/", async (req, res) => {
  const { username, name } = req.body;
  if (!username || !name) {
    return res.status(400).json({ error: "Username and name are required" });
  }
  const user = await User.create({ username, name });
  res.status(201).json(user);
});

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: ["title", "author", "url", "likes"],
      },
    ],
  });
  res.json(users);
});

router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.username = username;
  await user.save();
  res.json(user);
});

export default router;
