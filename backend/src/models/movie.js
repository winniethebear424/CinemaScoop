const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A movie must have a title"],
    },
    introduction: {
      type: String,
    },
    releaseYear: {
      type: String,
    },
    director: {
      type: String,
    },
    writer: {
      type: String,
    },
    stars: {
      type: String,
    },
    rate: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
