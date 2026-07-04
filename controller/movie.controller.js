import * as movieService from "./movie.service.js";

export async function getAllMovies(req, res, next) {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
}

export async function getWatchedMovies(req, res, next){
    try {
        const movies = await movieService.getWatchedMovies();
        res.status(200).json(movies);
    }catch (error){
        next(error);
    }
}

export async function getUnwatchedMovies(req, res, next) {
  try {
    const movies = await movieService.getUnwatchedMovies();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
}

export async function getMovieById(req, res, next) {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}

export async function createMovie(req, res, next) {
  try {
    const newMovie = await movieService.createMovie(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
}

export async function updateMovie(req, res, next) {
  try {
    const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
}

export async function deleteMovie(req, res, next) {
  try {
    const deleted = await movieService.deleteMovie(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}