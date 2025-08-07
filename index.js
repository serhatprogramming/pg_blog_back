import "dotenv/config.js";
import express from "express";
import { Sequelize, Model, DataTypes } from "sequelize";
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);
class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "Blog", timestamps: false, underscored: true }
);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    const blog = await Blog.create({ title, author, url, likes });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: "Failed to create blog" });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
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

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
