import jwt from "jsonwebtoken";
import models from "../models/index.js";
const { User } = models;
import { jwtSecret } from "./config.js";

const userExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      req.decodedToken = decodedToken;
      req.user = await User.findByPk(req.decodedToken.id);
      if (!req.user) {
        req.user = null;
      }
    } catch (error) {
      return res.status(401).json({ error: "invalid or missing token" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

export default userExtractor;
