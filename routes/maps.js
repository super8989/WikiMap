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
    console.log(req.session);
    if (!req.session) {
      res.render("maps", {user: null});
    } else {
      res.render("maps", {user: req.session.username});
    }
  });

  // Add a new pin to db
  router.post("/", (req, res) => {
    let queryString = `
      INSERT INTO pins (title, description, image_url, latitude, longitude, created_at)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    // req.body = {} from the submit form for new pin
    let values = req.body;
    let { title, description, image_url, latitude, longitude } = values;

    console.log("values from .post", values);

    db.query(queryString, [
      title,
      description,
      image_url,
      parseFloat(latitude),
      parseFloat(longitude),
      new Date(),
    ])
      .then((data) => {
        console.log("data.rows from post", data.rows);
        return data.rows;
      })
      .catch((err) => console.error("query error", err.stack));
    // console.log([values.title, values.description]);
    res.redirect("/maps");
  });

  // instead of res.redirect which refreshes the page, do res.json(data.rows[0]) to the popup with AJAX
  //return data.rows[0] send only the single object back to the client side (due to RETURNING *) -> addPinFromDb only with that single object

  // Remove pins from maps.js
  router.post("/:id/delete", (req, res) => {
    console.log("id from maps.js delete:", req.params.id);
    let values = [req.params.id];
    let queryString = `
      DELETE FROM pins
      WHERE id = $1;`;

    db.query(queryString, values)
      .then((data) => console.log(data))
      .catch((err) => console.lerror("query error", err.stack));

    res.redirect("/maps");
  });

  return router;
};
