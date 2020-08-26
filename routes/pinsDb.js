/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

// 8080/api/pins
module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   let queryString = `SELECT * FROM pins`;

  //   db.query(queryString)
  //     .then((data) => {
  //       const pins = data.rows;
  //       res.json({ pins });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  // router.get("/:mapId", (req, res) => {
  //   const userId = parseInt(req.params.mapId);
  //   let queryString = `SELECT * FROM pins WHERE map_id = $1`;

  //   db.query(queryString, [userId]).then((data) => {
  //     const pins = data.rows;
  //     res.json({ pins });
  //   });
  // });

  // api/pins ---- all the pins

  // /maps/map_id  --- a map that user created

  //SELECT * FROM pins JOIN maps ON pins.map_id = map.id
  //where map_id = req.params.map_id

  return router;
};
