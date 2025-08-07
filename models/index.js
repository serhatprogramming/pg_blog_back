import Blog from "./blog.js";

Blog.sync({ force: true })
  .then(() => {
    console.log("Blog model synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing Blog model:", error);
  });

export default { Blog };
