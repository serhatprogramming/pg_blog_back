import { Sequelize } from "sequelize";

import "dotenv/config.js";

const sequelize = new Sequelize(process.env.DATABASE_URL);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
};
testConnection();

try {
  const blogs = await sequelize.query("SELECT * FROM blogs", {
    type: Sequelize.QueryTypes.SELECT,
  });
  blogs.map((blog) =>
    console.log(
      `${blog.author == null ? "No name" : blog.author}: ${blog.title}, ${
        blog.likes
      } likes`
    )
  );
} catch (error) {
  console.error("Error during database operation:", error);
}
