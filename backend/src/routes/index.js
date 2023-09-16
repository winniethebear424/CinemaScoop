const reviewRouter = require("./reviewRoute.js");
const { globalErrorHandler } = require("../middleware/globalErrorHandler.js");
const AppError = require("../utils/appError.js");

const registerRoutes = (app) => {
  app.use("/api/v1/reviews", reviewRouter);

  //handle undefined routes
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`));
  });
  app.use(globalErrorHandler);
};

module.exports = {
  registerRoutes,
};
