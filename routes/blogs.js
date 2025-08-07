import { Router } from "express";
const router = Router();

import Blog from "../models/index.js";

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    const blog = await Blog.create({ title, author, url, likes });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: "Failed to create blog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await blog.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
