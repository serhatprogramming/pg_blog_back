import express from "express";
const app = express();
import blogsRouter from "./routes/blogs.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import authorsRouter from "./routes/authors.js";
import { port } from "./util/config.js";
import errorHandler from "./util/errorHandler.js";
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

import { connectDB } from "./util/db.js";

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
