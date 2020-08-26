/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

// 8080/api
module.exports = (db) => {
  // Pins db based on map id
  router.get("/maps/:map_id/pins", (req, res) => {
    let queryString = `SELECT * FROM pins WHERE map_id = $1`;

    db.query(queryString, [req.params.map_id]).then((data) => {
      res.json({ pins: data.rows });
    });
  });

  // All pins
  router.get("/pins", (req, res) => {
    let queryString = `SELECT * FROM pins`;

    db.query(queryString)
      .then((data) => {
        const pins = data.rows;
        res.json({ pins });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // All users
  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
