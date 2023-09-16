const express = require("express");
const { userHandler } = require("../controllers/authController.js");
const { jwtCheck } = require("../controllers/authController.js");
const {
  createNewMovie,
  findMovies,
  findMovieById,
} = require("../controllers/movieController.js");

const router = express.Router();

router.route("/").get(findMovies).post(jwtCheck, userHandler, createNewMovie);

router.route("/:id").get(findMovieById);

module.exports = router;
