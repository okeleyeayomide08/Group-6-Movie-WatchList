import dotenv from "dotenv";
dotenv.config();

import express from "express";
// import movieRoutes from "./routes/movieRoutes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// app.use("/api", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
