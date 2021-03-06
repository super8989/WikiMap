// Routes for login process are defined here.

const express = require('express');
const router  = express.Router();
const { getUserByUsername, getUserByEmail } = require('./helpers');
const bcrypt = require('bcrypt');

module.exports = (db) => {

  // GET /login if no user is logged in. If user is logged in, redirect to /maps.
  router.get('/', (req, res) => {
    const userID = req.session.user_id;
    const username = req.session.username;
    if (!userID) {
      res.render('login', {user: username, id: userID, mapName: null});
    } else {
      res.redirect('/maps');
    }
  });

  // POST to /login only if existing user with valid username, email and password. Checks if username and email have previously been registered via helper functions getUserByUsername and getUserByEmail in helpers.js file. If username, email, or password don't match, error message is shown - for privacy, message doesn't indicate which is incorrect. Once logged in, redirects to /users/:id.
  router.post('/', (req, res) => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    const templateVars = {};
    if (user.username === '' || user.email === '' || user.password === '') {
      res.statusCode = 400;
      templateVars.user = null;
      templateVars.id = null;
      templateVars.mapName = null;
      templateVars.message = 'Oops, you left the username, email and/or password field(s) blank. Please try again.';
      res.render('400', templateVars);
    } else {
      getUserByUsername(db, user.username)
        .then(existingUser => {
          if (!existingUser) {
            res.statusCode = 403;
            templateVars.user = null;
            templateVars.id = null;
            templateVars.mapName = null;
            templateVars.message = 'Incorrect username, email and/or password.';
            res.render('403', templateVars);
          } else {
            getUserByEmail(db, user.email)
              .then(existingUser => {
                if (!existingUser) {
                  res.statusCode = 403;
                  templateVars.message = 'Incorrect username, email and/or password.';
                  templateVars.user = null;
                  templateVars.id = null;
                  templateVars.mapName = null;
                  res.render('403', templateVars);
                } else if (!bcrypt.compareSync(user.password, existingUser.password)) {
                  res.statusCode = 403;
                  templateVars.message = 'Incorrect username, email and/or password.';
                  templateVars.user = null;
                  templateVars.id = null;
                  templateVars.mapName = null;
                  res.render('403', templateVars);
                } else {
                  const userID = existingUser.id;
                  const username = existingUser.username;
                  req.session.user_id = userID;
                  req.session.username = username;
                  templateVars.mapName = null;
                  console.log(req.session);
                  res.redirect(`/users/${userID}`);
                }
              });
          }
        });
    }
  });

  return router;

};
