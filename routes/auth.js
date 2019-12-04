const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');

// USE the User MODEL!
const User = require('../models/User');

// SIGNING UP:
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is invalid" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must have at least 6 characters" });
  }

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      return bcrypt
        .genSalt()
        .then(salt => {
          return bcrypt.hash(password, salt);
        })
        .then(hash => {
          return User.create({ username: username, password: hash });
        })
        .then(newUser => {
          // passport login
          req.login(newUser, err => {
            if (err) res.status(500).json(err);
            else res.json(newUser);
          });
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// LOGGING IN:
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // passport req.login
    req.login(user, err => {
      if (err) res.status(500).json(err);
      res.status(200).json(user);
    });
  })(req, res, next);
});

// LOGGING OUT:
router.delete("/logout", (req, res) => {
  // passport logout function
  req.logout();
  res.status(200).json({ message: "Successful logout" });
});

// CHECKING IF LOGGED IN - for CONDITIONAL RENDERING
router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
