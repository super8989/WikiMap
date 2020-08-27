/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getPinsForMapById, updatePin } = require("./helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM pins`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const pins = data.rows;
        res.json({ pins });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    const requestedMapId = req.params.id;
    getPinsForMapById(db, requestedMapId)
      .then((pins) => {
        for (pin in pins) {
          const userID = req.session.user_id;
          console.log(userID);
          if (userID) {
            pins[pin].logUser = userID;
          } else {
            pins[pin].logUser = null;
          }
        }
        console.log(pins);
        res.json({ pins });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put("/:id", (req, res) => {
    const requestedPinId = req.params.id;
    const pinDetails = {
      title: req.params.title,
      description: req.params.description
    };
    updatePin(db, requestedPinId, pinDetails)
      .then((updatedPin) => {
        res.json({ updatedPin });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
