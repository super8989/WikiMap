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
          // console.log(userID);
          if (userID) {
            pins[pin].logUser = userID;
          } else {
            pins[pin].logUser = null;
          }
        }
        // console.log(pins);
        res.json({ pins });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id", (req, res) => {
    const requestedPinId = req.params.id;
    const pinDetails = {
      title: req.body.title,
      description: req.body.description,
      mapID: req.body.map_id
    };
    updatePin(db, requestedPinId, pinDetails)
      .then(() => {
        res.redirect(`/maps/${pinDetails.mapID}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

   // Remove pins from maps.js
   router.post("/:id/delete", (req, res) => {
    console.log("id from maps.js delete:", req.params.id);
    console.log(req.body);
    const mapID = req.body.map_id;
    const templateVars = {};
    if (!req.session.user_id) {
      templateVars.user = null;
      templateVars.id = null;
      templateVars.mapName = null;
      res.statusCode = 401;
      res.render('401', templateVars);
    } else {
      templateVars.user = req.session.username;
      templateVars.id = req.session.user_id;
      let values = [req.params.id];
      let queryString = `
        DELETE FROM pins
        WHERE id = $1;`;

      db.query(queryString, values)
        .then((data) => console.log(data))
        .catch((err) => console.lerror("query error", err.stack));

      res.redirect(`/maps/${mapID}`);
    }
  });

  return router;
};
