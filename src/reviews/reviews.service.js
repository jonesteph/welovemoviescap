const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
})




function read(review_id) {
  return knex("reviews AS r")
    .join("critics AS c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic)
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ "review_id": updatedReview.review_id })
    .update(updatedReview, "*")
}

function destroy(review_Id) {
    return knex("reviews")
      .where({ "review_id": review_Id })
      .del()
}



module.exports = {
  read,
  update,
  delete: destroy,
}