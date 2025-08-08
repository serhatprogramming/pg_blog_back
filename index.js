import express from "express";
const app = express();
import blogsRouter from "./routes/blogs.js";
import { port } from "./util/config.js";
import errorHandler from "./util/errorHandler.js";
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(errorHandler);

import { connectDB } from "./util/db.js";

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
