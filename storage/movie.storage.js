import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// edited by Mavery: use a Node-compatible dirname helper for ESM projects.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moviesDataPath = path.join(
  __dirname,
  "..",
  "data",
  "movies.json",
);

// Reads the data and sends the parsed data, if data is empty returns [] and if error like files is empty return [] and logs other errors
async function readMovies() {
  try {
    const data = await fs.readFile(moviesDataPath, "utf8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

// Covert object to string and save the movies.
async function writeMovies(movies) {
  try {
    const jsonString = JSON.stringify(movies, null, 2);

    await fs.writeFile(moviesDataPath, jsonString, "utf8");
  } catch (error) {
    console.log(`Error writing file: ${error.message}`);
    // edited by Mavery: rethrow so controllers can return an error instead of silently succeeding.
    throw error;
  }
}

export { readMovies, writeMovies };
