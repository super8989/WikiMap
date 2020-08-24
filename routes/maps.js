const express = require("express");
const { getAllPinsFromDb } = require("../database");
const router = express.Router();

// how can i use getAllPinsFromDb from the database.js inside router.get

module.exports = (db) => {
  router.get("/", (req, res) => {
    // const pinsData = getAllPinsFromDb().then((result) => {
    //   console.log(result[0]);
    //   return result[0];
    // });

    res.render("maps");
  });

  // Add a new pin to db
  router.post("/", (req, res) => {
    let queryString = `
      INSERT INTO pins (title, description, latitude, longitude, created_at) VALUES ($1, $2, $3, $4, now()::date) RETURNING *;
    `;
    // req.body = {} from the submit form for new pin
    let values = req.body;
    let { title, description, latitude, longitude } = values;

    console.log("values", values);

    db.query(queryString, [
      title,
      description,
      parseFloat(latitude),
      parseFloat(longitude),
    ])
      .then((data) => {
        console.log("data.rows", data.rows);
        return data.rows;
      })
      .catch((err) => console.error("query error", err.stack));
    // console.log([values.title, values.description]);
    res.redirect("/maps");
  });

  return router;
};
