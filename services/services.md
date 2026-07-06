# Using the Movie Service in Your Routes

The service layer contains all the business logic for managing movies. It should be imported into the routes file, where each route handler calls the appropriate service function.

## 1. Import the Service Functions

If your project structure looks like this:

```
project/
│
├── routes/
│   └── movie.routes.js
│
├── services/
│   ├── movie.service.js
│   └── movie.storage.js
```

Import the service functions into your routes file.

```javascript
import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getUnwatchedMovies,
} from "../services/movie.service.js";

const router = express.Router();
```

---

# 2. Get All Movies

### Service Function

```javascript
getAllMovies()
```

### Route

```javascript
router.get("/", async (req, res) => {
  try {
    const movies = await getAllMovies();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
```

### Example Request

```
GET /movies
```

### Example Response

```json
[
  {
    "id": "1",
    "title": "Avatar"
  },
  {
    "id": "2",
    "title": "Titanic"
  }
]
```

---

# 3. Get Movie By ID

### Service Function

```javascript
getMovieById(id)
```

### Route

```javascript
router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
```

### Example Request

```
GET /movies/4f8d3f
```

---

# 4. Create Movie

### Service Function

```javascript
createMovie(movie)
```

### Route

```javascript
router.post("/", async (req, res) => {
  try {
    const movie = await createMovie(req.body);

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
```

### Example Request

```
POST /movies
```

Body

```json
{
  "title": "Interstellar",
  "director": "Christopher Nolan",
  "year": 2014,
  "genre": "Sci-Fi",
  "watched": false
}
```

---

# 5. Update Movie

### Service Function

```javascript
updateMovie(id, movie)
```

### Route

```javascript
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await updateMovie(
      req.params.id,
      req.body
    );

    if (!updatedMovie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
```

### Example Request

```
PUT /movies/4f8d3f
```

Body

```json
{
  "watched": true
}
```

---

# 6. Delete Movie

### Service Function

```javascript
deleteMovie(id)
```

### Route

```javascript
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteMovie(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
```

### Example Request

```
DELETE /movies/4f8d3f
```

---

# 7. Get Unwatched Movies

### Service Function

```javascript
getUnwatchedMovies()
```

### Route

```javascript
router.get("/unwatched", async (req, res) => {
  try {
    const movies = await getUnwatchedMovies();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
```

### Example Request

```
GET /movies/unwatched
```

---

# How Data Flows Through the Application

```
Client (Postman / Frontend)
            │
            ▼
        Route Handler
            │
            ▼
     Service Function
            │
            ▼
 readMovies() / writeMovies()
            │
            ▼
       movies.json
            │
            ▼
     Service returns data
            │
            ▼
       Route sends response
            │
            ▼
           Client
```

---

# Responsibilities

## Route Layer

The route layer is responsible for:

- Receiving HTTP requests.
- Extracting route parameters (`req.params`).
- Extracting request body (`req.body`).
- Calling the appropriate service function.
- Returning HTTP responses and status codes.

## Service Layer

The service layer is responsible for:

- Reading movie data.
- Creating new movies.
- Finding movies.
- Updating existing movies.
- Deleting movies.
- Returning business data to the routes.

The service layer should **not** use `req`, `res`, or Express-specific logic.

## Storage Layer

The storage layer is responsible for:

- Reading `movies.json`.
- Writing updated data back to `movies.json`.

It should contain no business logic and no HTTP-related code.