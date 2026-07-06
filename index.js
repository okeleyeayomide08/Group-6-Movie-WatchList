import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fileURLToPath } from "node:url";
import movieRoutes from "./routes/movieRoutes.js";

const PORT = process.env.PORT || 3000;
const currentFilePath = fileURLToPath(import.meta.url);

const app = express();

app.use(express.json());

app.use(movieRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

if (process.argv[1] === currentFilePath) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
