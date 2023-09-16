const Review = require("../models/review.js");
const APIFeatures = require("../utils/apiFeatures.js");

const getAllReviews = async (request) => {
  const features = new APIFeatures(Review.find(), request.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return features.query;
};

const createReview = async (req) => {
  const body = { ...req.body };
  body.user = req.user;
  const newReview = new Review(body);
  return newReview.save();
};

const deleteReview = async (id) => {
  const reviews = Review.findByIdAndDelete(id);
  return reviews;
};

const updateReviewById = async (id, req) => {
  const body = { ...req.body };
  body.user = req.user;
  const oldReviews = await Review.findById(id);
  if (oldReviews.user === body.user) {
    const newReivews = Review.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return newReivews;
  }
};

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
  updateReviewById,
};
