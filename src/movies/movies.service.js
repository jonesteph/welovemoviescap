const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")


const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
})


function list() {
  return knex("movies")
    .select("*")
}

function read(movie_id) {
  return knex("movies")
    .select("*")
    .where({ "movie_id": movie_id })
    .first()
}

function showingList(is_showing){
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .distinct()
}

function theatersList(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"mt.movie_id": movie_id, "is_showing": true })
}

function reviewsList(movie_id) {
  return knex("movies AS m")
    .join("reviews AS r", "m.movie_id", "r.movie_id")
    .join("critics AS c", "c.critic_id", "r.critic_id")
    .select("c.*", "r.*")
    .where({"m.movie_id": movie_id})
    .then((data) => data.map(addCritic))
}

module.exports = {
  list,
  read,
  showingList,
  theatersList,
  reviewsList,
}