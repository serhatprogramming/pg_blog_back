import { Router } from "express";
const router = Router();

import models from "../models/index.js";
const { Blog, User } = models;
import blogFinder from "../util/blogFinder.js";
import userExtractor from "../util/userExtractor.js";

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["username", "name"],
        exclude: ["id"],
      },
    ],
  });
  res.json(blogs);
});

router.post("/", userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const blog = await Blog.create({
    title,
    author,
    url,
    likes,
    userId: user.id,
  });
  res.status(201).json(blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
  const { blog } = req;
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  await blog.destroy();
  res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res) => {
  const { blog } = req;
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  const { likes } = req.body;
  blog.likes = likes;
  await blog.save();
  res.json(blog);
});

export default router;
