# Movie Storage


The storage module is responsible for reading from and writing to the `movies.json` file.


## Import


```js
import { readMovies, writeMovies } from "./movie.storage.js";
```


## `readMovies()`


Reads all movies from the JSON file and returns them as an array.


### Example


```js
const movies = await readMovies();


console.log(movies);
```


### Returns


```js
[
  {
    id: "1",
    title: "Inception",
    watched: false,
    ...
  },
];
```


If the file is empty, it returns:


```js
[];
```


If an unexpected error occurs (such as invalid JSON or a file system error), the function throws the error.


---


## `writeMovies(movies)`


Writes the provided array of movies to the JSON file.


### Parameters


| Name     | Type    | Description                         |
| -------- | ------- | ----------------------------------- |
| `movies` | `Array` | The array of movie objects to save. |


### Example


```js
const movies = await readMovies();


movies.push({
  id: "2",
  title: "Interstellar",
  watched: false,
});


await writeMovies(movies);
```


If writing fails, the function throws the error.
