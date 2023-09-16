// CommonJS require statements
const Movie = require("../models/movie.js");
const APIFeatures = require("../utils/apiFeatures.js");

//create movie
const createMovie = async (newMovie) => {
  const movie = new Movie(newMovie);
  return movie.save();
};

//get movie
const getMovies = async (request) => {
  const features = new APIFeatures(Movie.find(), request.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return features.query;
};

//get movie by id
const getMovieById = async (id) => {
  const movie = Movie.findById(id);
  return movie;
};

//update movie by id
const updateMovieById = async (id, newMovie) => {
  const movie = Movie.findByIdAndUpdate(id, newMovie, {
    new: true,
    runValidators: true,
  });
  return movie;
};

//delete movie by id
const deleteMovieById = async (id) => {
  const movie = Movie.findByIdAndDelete(id);
  return movie;
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
