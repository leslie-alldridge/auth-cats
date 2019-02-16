const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);
const crypto = require("./crypto");

module.exports = {
  create,
  exists,
  getById,
  getByName
};

function create(username, password, testDb) {
  const connection = testDb || knex;

  return new Promise((resolve, reject) => {
    crypto.generate(password, (err, hash) => {
      if (err) reject(err);
      connection("users")
        .insert({ username, hash })
        .then(user_id => resolve(user_id))
        .catch(err => reject(err));
    });
  });
}

function exists(username, testDb) {
  const connection = testDb || knex;
  return connection("users")
    .count("id as n")
    .where("username", username)
    .then(count => {
      return count[0].n > 0;
    });
}

function getById(id, testDb) {
  const connection = testDb || knex;
  return connection("users")
    .select("id", "username")
    .where("id", id)
    .first();
}

function getByName(username, testDb) {
  const connection = testDb || knex;
  return connection("users")
    .select()
    .where("username", username)
    .first();
}
