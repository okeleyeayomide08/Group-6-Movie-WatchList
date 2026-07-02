/*
 if you are done with the controllers change. import it here and change this (req, res) => {
  res.send("Get all movies");
} to the name of the function of each controller route
*/

import express from "express";

const router = express.Router();

router.get("/resources", (req, res) => {
  res.send("Get all movies");
});

router.get("/resources/unwatched", (req, res) => {
  res.send("Get unwatched movies");
});

router.get("/resources/:id", (req, res) => {
  res.send("Get one movie");
});

router.post("/resources", (req, res) => {
  res.send("Create a movie");
});

router.put("/resources/:id", (req, res) => {
  res.send("Update a movie");
});

router.delete("/resources/:id", (req, res) => {
  res.send("Delete a movie");
});

export default router;
