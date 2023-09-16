const {
  createMovie,
  getMovies,
  getMovieById,
} = require("../services/movieServices.js");
const AppError = require("../utils/appError.js");
const catchAsync = require("../utils/catchAsync.js");

const createNewMovie = catchAsync(async (req, res, next) => {
  const movie = await createMovie(req.body);
  res.status(201).json({
    status: "success",
    data: {
      movie,
    },
  });
});

const findMovies = catchAsync(async (req, res, next) => {
  const movies = await getMovies(req);
  res.status(200).json({
    status: "success",
    results: movies.length,
    data: {
      movies,
    },
  });
});

const findMovieById = catchAsync(async (req, res, next) => {
  const movie = await getMovieById(req.params.id);
  if (!movie) {
    return next(new AppError("No movie found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

module.exports = {
  createNewMovie,
  findMovies,
  findMovieById,
};
