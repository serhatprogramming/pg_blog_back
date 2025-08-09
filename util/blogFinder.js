import models from "../models/index.js";
import asyncTryCatch from "./asyncTryCatch.js";

const { Blog } = models;

const blogFinder = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Blog id is required" });
  }
  const blog = await Blog.findByPk(id);
  req.blog = blog;
  next();
});

export default blogFinder;
