/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let queryString = `
      INSERT INTO pins (title, description, lat, lng) VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    // req.body = {} from the submit form for new pin
    let values = req.body;
    let { title, description, lat, lng } = values;

    console.log(values);
    db.query(queryString, [
      title,
      description,
      parseFloat(lat),
      parseFloat(lng),
    ])
      .then((data) => {
        console.log(data.rows);
        return data.rows;
      })
      .catch((err) => console.error("query error", err.stack));
    // console.log([values.title, values.description]);
    res.redirect("/");
  });
  return router;
};
