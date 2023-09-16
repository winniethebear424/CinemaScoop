const express = require("express");
const {
  findAllReview,
  addReview,
  removeReview,
  editReview,
} = require("../controllers/reviewController.js");
const { jwtCheck, userHandler } = require("../controllers/authController.js");

const router = express.Router();

router.route("/").get(findAllReview).post(jwtCheck, userHandler, addReview);

router
  .route("/:id")
  .patch(jwtCheck, userHandler, editReview)
  .delete(jwtCheck, removeReview);

module.exports = router;
