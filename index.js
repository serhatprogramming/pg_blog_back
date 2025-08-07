import express from "express";
const app = express();
import blogsRouter from "./routes/blogs.js";

app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
