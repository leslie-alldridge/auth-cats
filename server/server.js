const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// check these files out for comments
const auth = require("./auth/auth");
const crypto = require("./auth/crypto");
const users = require("./auth/users");

const server = express();

server.use(cors("*"));

server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "../public")));

//auth routes
server.post("/signin", signIn, auth.issueJwt);
server.post("/register", register, auth.issueJwt);

//sign in function - gets the user from the DB.
// if nothing comes back, invalid credentials function runs
// if successful, we run the compare function in crypto file to see if the password string in the login form matches their hashed password

function signIn(req, res, next) {
  users
    .getByName(req.body.username)
    .then(user => {
      return user || invalidCredentials(res);
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        crypto.compare(req.body.password, String(user.hash), (err, match) => {
          return resolve(match);
        });
      });
    })
    .then(isValid => {
      return isValid ? next() : invalidCredentials(res);
    })
    .catch(() => {
      res.status(400).send({
        errorType: "DATABASE_ERROR"
      });
    });
}

function register(req, res, next) {
  users
    .exists(req.body.username)
    .then(exists => {
      if (exists) {
        return res.status(400).send({ message: "User already exists" });
      }
      users.create(req.body.username, req.body.password).then(() => next());
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
}

function invalidCredentials(res) {
  res.status(400).send({
    errorType: "INVALID_CREDENTIALS"
  });
}

//for all routes that satisfy /api/v1/cats we will use routes defined in our cats routes
server.use("/api/v1/cats", require("./routes/cats"));

module.exports = server;
