const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

// Defining usable methods
router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed)

router
  .route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed)

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed)

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed)

module.exports = router