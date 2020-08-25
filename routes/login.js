// All routes for login and logout process are defined here.

const express = require('express');
const router  = express.Router();
const { getUserByUsername, getUserByEmail } = require('./helpers');
const bcrypt = require('bcrypt');

module.exports = (db) => {

  // GET /login if no user is logged in. If user is logged in, redirect to /maps.
  router.get('/login', (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
      res.render('login', {user: null});
    } else {
      res.redirect('/maps', {user: null});
    }
  });

  // POST to /login only if existing user with valid username, email and password. Checks if username and email have previously been registered via helper functions getUserByUsername and getUserByEmail in helpers.js file. If username, email, or password don't match, error message is shown - for privacy, message doesn't indicate which is incorrect. Once logged in, redirects to /maps (for now, can be changed to redirect to user's profile or create new map, etc. later.)
  router.post('/login', (req, res) => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    const templateVars = {};
    if (user.username === '' || user.email === '' || user.password === '') {
      res.statusCode = 400;
      templateVars.message = 'Oops, you left the username, email and/or password field(s) blank. Please try again.';
      res.render('400', templateVars);
    } else {
      getUserByUsername(db, user.username)
        .then(existingUser => {
          if (!existingUser) {
            res.statusCode = 403;
            templateVars.message = 'Incorrect username, email and/or password.';
            res.render('403', templateVars);
          } else {
            getUserByEmail(db, user.email)
              .then(existingUser => {
                if (!existingUser) {
                  res.statusCode = 403;
                  templateVars.message = 'Incorrect username, email and/or password.';
                  res.render('403', templateVars);
                } else if (!bcrypt.compareSync(user.password, existingUser.password)) {
                  res.statusCode = 403;
                  templateVars.message = 'Incorrect username, email and/or password.';
                  res.render('403', templateVars);
                } else {
                  const userID = existingUser.id;
                  req.session.user_id = userID;
                  res.redirect('/maps');
                }
              });
          }
        });
    }
  });

  // POST to /logout and destroy session cookie.
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/maps');
  });

  return router;

};
