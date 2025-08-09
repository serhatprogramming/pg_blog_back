import { ValidationError } from "sequelize";
const errorHandler = (err, req, res, next) => {
  // Sequelize validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  // Postgres unique constraint violation
  if (err.code === "23505") {
    return res.status(400).json({ error: "Unique constraint violation" });
  }

  // Postgres foreign key violation
  if (err.code === "23503") {
    return res.status(400).json({ error: "Foreign key violation" });
  }

  // Postgres not null violation
  if (err.code === "23502") {
    return res.status(400).json({ error: "Not null violation" });
  }
  console.error(err);
  // Other errors
  return res.status(500).json({ error: "Internal server error" });
};

export default errorHandler;
