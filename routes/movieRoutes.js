import express from "express";
import * as movieController from "../controller/movie.controller.js";
import { validateMovieMiddleware } from "../middleware/validation.js";

const router = express.Router();

// Get all movies
router.get("/resources", movieController.getAllMovies);

// Get watched movies (optional if your assignment includes it)
router.get("/resources/watched", movieController.getWatchedMovies);

// Get unwatched movies
router.get("/resources/unwatched", movieController.getUnwatchedMovies);

// Get one movie
router.get("/resources/:id", movieController.getMovieById);

// Create a movie
router.post("/resources", validateMovieMiddleware, movieController.createMovie);

// Update a movie
router.put(
  "/resources/:id",
  validateMovieMiddleware,
  movieController.updateMovie,
);

// Delete a movie with movies id
router.delete("/resources/:id", movieController.deleteMovie);

export default router;
