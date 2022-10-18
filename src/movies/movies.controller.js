const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


// Middleware
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId)
  if (movie) {
    res.locals.movie = movie
    return next()
  }
  next({ status: 404, message: `Movie cannot be found.` })
}


// Methods
function read(req, res) {
  const { movie: data } = res.locals
  res.json({ data })
}

async function list(req, res) {
  if(req.query.is_showing){
    const data = await moviesService.showingList()
    res.json({ data })
  }else{
    const data = await moviesService.list()
    res.json({ data })
  }
}

async function listTheaters(req, res) {
    const data = await moviesService.theatersList(req.params.movieId)
    res.json({ data })
}

async function listReviews(req, res) {
    const data = await moviesService.reviewsList(req.params.movieId)
    res.json({ data })
}


module.exports = {
  read : [asyncErrorBoundary(movieExists), read],
  list : asyncErrorBoundary(list),
  listReviews : [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
  listTheaters : [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
}