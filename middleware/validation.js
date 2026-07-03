const VALID_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short Film",
  "Sport",
  "Thriller",
  "War",
  "Western",
];

function validateMovie(movie, { isUpdate = false } = {}) {
  const errors = [];

  //Title validation
  if (!isUpdate || movie.title !== undefined) {
    if (typeof movie.title !== "string" || movie.title.trim() === "") {
      errors.push("Title is required and must not be an empty string.");
    }
  }

  //Genre validation
  if (!isUpdate || movie.genre !== undefined) {
    const genreCaseInsensitive = VALID_GENRES.map((g) => g.toLowerCase());
    if (
      typeof movie.genre !== "string" ||
      !genreCaseInsensitive.includes(movie.genre.toLowerCase())
    ) {
      errors.push(
        `Genre must be one of the following: ${VALID_GENRES.join(", ")}.`
      );
    }
  }

  //Watched validation
  if (!isUpdate || movie.watched !== undefined) {
    if (typeof movie.watched !== "boolean") {
      errors.push("Watched must be a (true or false) which's a boolean value.");
    }
  }

  //Year validation
  if (!isUpdate || movie.releaseYear !== undefined) {
    if (
      typeof movie.releaseYear !== "number" ||
      !Number.isInteger(movie.releaseYear) ||
      movie.releaseYear < 1888 ||
      movie.releaseYear > new Date().getFullYear()
    ) {
      errors.push(
        ` Release year must be an integer between 1888 and ${new Date().getFullYear()}.`
      );
    }
  }

  //Rating validation
  if (movie.rating !== undefined && movie.rating !== null) {
    if (
      typeof movie.rating !== "number" ||
      movie.rating < 1 ||
      movie.rating > 10
    ) {
      errors.push("Rating must be a number between 1 and 10.");
    }
    if (movie.watched === false) {
      errors.push("Rating can only be provided if the movie has been watched.");
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Middleware function to validate movie data
function validateMovieMiddleware(req, res, next) {
  const isUpdate = req.method === "PATCH" || req.method === "PUT";
  const { isValid, errors } = validateMovie(req.body, { isUpdate });
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  next();
}
export { validateMovie, validateMovieMiddleware, VALID_GENRES };
