import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
// Initializing Express app

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
const app = express();

// Middleware to receive JSON
app.use(express.json());

// Adding the API end-points and the route handlers
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/client/dist/index.html")));

// Connecting to MongoDB using Mongoose
mongoose
  .connect(process.env.DATABASE_URL, { dbName: "demo_db" })
  .then(() => {
    console.log("connected to DB successfully");
    
    // Listening to requests if DB connection is successful
    app.listen(4000, () => console.log("Listening to port 4000"));
  })
  .catch((err) => console.log(err));
