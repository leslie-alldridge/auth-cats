var bcrypt = require("bcrypt");

//generate and compare functions use bcrypts built in .hash and .compare functions to hash the password and compare will unhash and compare the passwords for us

function generate(password, cb) {
  bcrypt.hash(password, 12, cb);
}

function compare(password, hash, cb) {
  bcrypt.compare(password, hash, cb);
}

module.exports = {
  generate,
  compare
};
