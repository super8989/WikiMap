// All routes for user profiles are defined here.

const express = require('express');
const router  = express.Router();
const { getUserByUsername, getUserById, getUserMaps, getUserFaves, getUserPins } = require('./helpers');

module.exports = (db) => {

  // GET /users/:username
  // If user is logged in, use helper function getUserByUsername to check if the user logged in is the owner of the profile being viewed in order to set view permissions in profiles_show.ejs file. If no user is logged in, or if the user logged in is NOT the same user as the profile being viewed, show public view of profile.
  // router.get('/users/:username', (req, res) => {
  //   const userID = req.session.user_id;
  //   const username = req.params.username;
  //   const templateVars = {};
  //   getUserByUsername(db, username)
  //     .then(user => {
  //       templateVars.ownerIsLoggedIn = user.id === userID;
  //       templateVars.username = username;
  //       res.render('profiles_show', templateVars);
  //     });
  // });

  // GET /users/:id
  // If user is logged in, use helper function getUserById to check if the user logged in is the owner of the profile being viewed in order to set view permissions in profiles_show.ejs file. If no user is logged in, of if the user logged in is NOT the same user as the profile being viewed, show public view of profile.

  router.get('/users/:id', (req, res) => {
    const currentUser = req.session.user_id;
    const requestedUserId = req.params.id;
    const templateVars = {};
    getUserById(db, requestedUserId)
      .then(user => {
        templateVars.ownerIsLoggedIn = currentUser === user.id;
        templateVars.username = user.username;
        getUserFaves(db, requestedUserId)
          .then(userFaves => {
            templateVars.userFaves = userFaves;
            getUserMaps(db, requestedUserId)
              .then(userMaps => {
                templateVars.userMaps = userMaps;
                getUserPins(db, requestedUserId)
                  .then(userPins => {
                    templateVars.userPins = userPins;
                    res.render('profiles_show', templateVars);
                  });
              });
          });

      });
  });

  return router;

};
