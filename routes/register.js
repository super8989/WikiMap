// All routes for registration process are defined here.

const express = require('express');
const router  = express.Router();
const { getUserByUsername, getUserByEmail, addUser } = require('./helpers');

module.exports = (db) => {

  // GET /register if no user is logged in. If user is logged in, redirect to /maps.
  router.get('/', (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
      res.render('register');
    } else {
      res.redirect('/maps');
    }
  });

  // POST to /register only if new user with valid username, email and password. Checks if username and email have previously been registered via helper functions getUserByUsername and getUserByEmail in helpers.js file. If registration successful, adds new user to database via helper function addUser in helpers.js file and redirects to /maps (for now, can be changed to redirect to user's profile or create new map, etc. later.)
  router.post('/', (req, res) => {
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
          if (existingUser) {
            res.statusCode = 400;
            templateVars.message = 'Sorry, that username is already registered.';
            res.render('400', templateVars);
          } else {
            getUserByEmail(db, user.email)
              .then(existingUser => {
                if (existingUser) {
                  res.statusCode = 400;
                  templateVars.message = 'Sorry, that email is already registered.';
                  res.render('400', templateVars);
                } else {
                  addUser(db, user);
                  res.redirect('/maps');
                }
              });
          }
        });
    }
  });

  return router;
};
