import express from "express";
const router = express.Router();

import models from "../models/index.js";
const { Blog } = models;
import { fn, col } from "sequelize";

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [fn("COUNT", col("id")), "articles"],
      [fn("SUM", col("likes")), "likes"],
    ],
    group: ["author"],
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

export default router;
