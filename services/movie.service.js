import crypto from "crypto";
import { readMovies, writeMovies } from "../storage/movie.storage.js";

export async function getAllMovies() {
  return await readMovies();
}

export async function getMovieById(id) {
  const movies = await readMovies();
  return movies.find((movie) => movie.id === id);
}

export async function createMovie(movie) {
  const movies = await readMovies();

  const now = new Date().toISOString();
  // generate server-owned fields and keep defaults in one place.
  const newMovie = {
    id: crypto.randomUUID(),
    title: movie.title,
    director: movie.director ?? null,
    releaseYear: movie.releaseYear,
    genre: movie.genre,
    watched: movie.watched,
    rating: movie.rating ?? null,
    createdAt: now,
    updatedAt: now,
  };

  movies.push(newMovie);
  await writeMovies(movies);
  return newMovie;
}

export async function updateMovie(id, movie) {
  const movies = await readMovies();
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) {
    return null;
  }

  // prevent clients from overwriting server-owned id/timestamps.
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...safeUpdates } = movie;

  movies[index] = {
    ...movies[index],
    ...safeUpdates,
    updatedAt: new Date().toISOString(),
  };
  await writeMovies(movies);
  return movies[index];
}

export async function deleteMovie(id) {
  const movies = await readMovies();
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) {
    return false;
  }
  movies.splice(index, 1);
  await writeMovies(movies);
  return true;
}

export async function getUnwatchedMovies() {
  const movies = await readMovies();
  return movies.filter((movie) => movie.watched === false);
}

// added the service used by GET /resources/watched.
export async function getWatchedMovies() {
  const movies = await readMovies();
  return movies.filter((movie) => movie.watched === true);
}
