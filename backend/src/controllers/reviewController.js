const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReviewById,
} = require("../services/reviewServices.js");
const catchAsync = require("../utils/catchAsync.js");

const addReview = catchAsync(async (req, res, next) => {
  const review = await createReview(req);
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

const findAllReview = catchAsync(async (req, res, next) => {
  const reviews = await getAllReviews(req);
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

const removeReview = catchAsync(async (req, res, next) => {
  await deleteReview(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

const editReview = catchAsync(async (req, res, next) => {
  const reviews = await updateReviewById(req.params.id, req);
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

module.exports = {
  addReview,
  findAllReview,
  removeReview,
  editReview,
};
