const express = require("express");
const { getAllPinsFromDb } = require("../database");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });

const MAPTILER_API_KEY = env.MAPTILER_API_KEY;
const GEOCODING_API_KEY = env.GEOCODING_API_KEY;

// 8080/maps
module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      mapTilerKey: MAPTILER_API_KEY,
      geocodingKey: GEOCODING_API_KEY,
    };
    res.render("maps", templateVars);
  });

  // Render a map based on map_id
  router.get("/:map_id", (req, res) => {
    const templateVars = {
      mapTilerKey: MAPTILER_API_KEY,
      geocodingKey: GEOCODING_API_KEY,
    };
    res.render("maps", templateVars);
  });

  // // Pins db based on map id
  // router.get("/api/:map_id", (req, res) => {
  //   let queryString = `SELECT * FROM pins WHERE map_id = $1`;

  //   db.query(queryString, [req.params.map_id]).then((data) => {
  //     res.json({ pins: data.rows });
  //   });
  //   // res.send("ok");
  // });

  // Add a new pin to db
  router.post("/", (req, res) => {
    let queryString = `
      INSERT INTO pins (title, description, image_url, latitude, longitude, created_at, map_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    // req.body = {} from the submit form for new pin
    let values = req.body;
    let { title, description, image_url, latitude, longitude, map_id } = values;

    console.log("values: maps.js", values);

    db.query(queryString, [
      title,
      description,
      image_url,
      parseFloat(latitude),
      parseFloat(longitude),
      new Date(),
      map_id,
    ])
      .then((data) => {
        // console.log("data.rows: maps.js", data.rows);
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
