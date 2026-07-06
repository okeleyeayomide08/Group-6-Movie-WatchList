import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";
import { createMovie, deleteMovie, getMovieById, getUnwatchedMovies, getWatchedMovies, updateMovie } from "../services/movie.service.js";
import { validateMovie } from "../middleware/validation.js";

const createdMovieIds = [];

async function createTestMovie(overrides = {}) {
  const movie = await createMovie({
    title: "Test Movie",
    director: "Test Director",
    releaseYear: 2020,
    genre: "Action",
    watched: false,
    ...overrides,
  });

  createdMovieIds.push(movie.id);
  return movie;
}

function markCleanedUp(id) {
  const index = createdMovieIds.indexOf(id);

  if (index !== -1) {
    createdMovieIds.splice(index, 1);
  }
}

test.after(async () => {
  for (const id of createdMovieIds) {
    await deleteMovie(id);
  }
});

test("validation rejects missing required fields", () => {
  const result = validateMovie({
    title: "",
    genre: "Not Real",
    releaseYear: "2010",
    watched: "false",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length >= 4);
});

test("movie service creates a movie with server-owned fields", async () => {
  const created = await createTestMovie();

  assert.ok(created.id);
  assert.equal(created.title, "Test Movie");
  assert.equal(created.watched, false);
  assert.ok(created.createdAt);
  assert.ok(created.updatedAt);
});

test("movie service reads a movie by id", async () => {
  const created = await createTestMovie({ title: "Readable Movie" });

  const found = await getMovieById(created.id);
  assert.equal(found.title, "Readable Movie");
});

test("movie service lists unwatched movies", async () => {
  const created = await createTestMovie({ watched: false });
  const unwatched = await getUnwatchedMovies();

  assert.ok(unwatched.some((movie) => movie.id === created.id));
});

test("movie service updates a movie without changing server-owned fields", async () => {
  const created = await createTestMovie();
  const updated = await updateMovie(created.id, {
    watched: true,
    rating: 8,
    id: "client-should-not-change-this",
  });

  assert.equal(updated.id, created.id);
  assert.equal(updated.watched, true);
  assert.equal(updated.rating, 8);
});

test("movie service lists watched movies", async () => {
  const created = await createTestMovie({ watched: true, rating: 8 });

  const watched = await getWatchedMovies();
  assert.ok(watched.some((movie) => movie.id === created.id));
});

test("movie service deletes a movie", async () => {
  const created = await createTestMovie();
  const deleted = await deleteMovie(created.id);
  const missing = await getMovieById(created.id);

  assert.equal(deleted, true);
  assert.equal(missing, undefined);
  markCleanedUp(created.id);
});

test("movies data file remains valid JSON", async () => {
  const data = await fs.readFile(new URL("../data/movies.json", import.meta.url), "utf8");
  assert.doesNotThrow(() => JSON.parse(data || "[]"));
});
