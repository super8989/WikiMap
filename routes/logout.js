// Routes for logout process are defined here.

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // POST to /logout and destroy session cookie.
  router.post('/', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;

};
