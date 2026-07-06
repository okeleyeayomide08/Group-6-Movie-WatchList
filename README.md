# Group 6 Movie Watchlist API

Express API for managing a movie watchlist with file-based JSON storage.


## Setup

```bash
npm install
npm start
```

The server runs on `http://localhost:3000` by default. You can override the port with a `.env` file:

```env
PORT=5000
```

For development with nodemon:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/resources` | Get all movies |
| GET | `/resources/watched` | Get watched movies |
| GET | `/resources/unwatched` | Get unwatched movies |
| GET | `/resources/:id` | Get one movie by ID |
| POST | `/resources` | Create a movie |
| PUT | `/resources/:id` | Update a movie |
| DELETE | `/resources/:id` | Delete a movie |

## Movie Schema

```json
{
  "id": "generated-by-server",
  "title": "Inception",
  "director": "Christopher Nolan",
  "releaseYear": 2010,
  "genre": "Sci-Fi",
  "watched": true,
  "rating": 9,
  "createdAt": "2026-07-04T11:42:47.101Z",
  "updatedAt": "2026-07-04T11:42:47.101Z"
}
```

Required fields for creating a movie:

- `title`: non-empty string
- `genre`: must match one of the allowed genres in `middleware/validation.js`
- `releaseYear`: integer from 1888 through the current year
- `watched`: boolean

Optional fields:

- `director`: string, defaults to `null`
- `rating`: number from 1 to 10, only allowed when `watched` is `true`

## Example Requests

Create a movie:

```bash
curl -X POST http://localhost:3000/resources \
  -H "Content-Type: application/json" \
  -d '{"title":"Interstellar","director":"Christopher Nolan","releaseYear":2014,"genre":"Sci-Fi","watched":false}'
```

Mark a movie as watched:

```bash
curl -X PUT http://localhost:3000/resources/MOVIE_ID \
  -H "Content-Type: application/json" \
  -d '{"watched":true,"rating":9}'
```

Get unwatched movies:

```bash
curl http://localhost:3000/resources/unwatched
```

Delete a movie:

```bash
curl -X DELETE http://localhost:3000/resources/MOVIE_ID
```

## Project Structure

```text
controller/movie.controller.js  Express controller functions
routes/movieRoutes.js           API route definitions
services/movie.service.js       Movie business logic
storage/movie.storage.js        JSON file read/write helpers
middleware/validation.js        Request validation
data/movies.json                Stored movie data
test/movie.test.js              Automated tests
```

## Team Work Mapping

- Routes: `routes/movieRoutes.js`
- File storage: `storage/movie.storage.js`
- Validation: `middleware/validation.js`
- Services/controllers: `services/movie.service.js`, `controller/movie.controller.js`
- Testing and README: `test/movie.test.js`, `README.md`
