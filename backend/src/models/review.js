const mongoose = require("mongoose");

const reviewSchem = new mongoose.Schema(
  {
    reviewContent: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    ratting: {
      type: Number,
      min: 1,
      max: 10,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    movieId: {
      type: String,
      require: [true, "Review must belong to a movie."],
    },
    user: {
      type: String,
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Review = mongoose.model("Review", reviewSchem);

module.exports = Review;
