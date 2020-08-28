const express = require("express");
const { getAllPinsFromDb } = require("../database");
const { getMapById, getAllMaps, getCoordinates, createNewMap, updateMap, deleteMap } = require("./helpers");
const router = express.Router();

// how can i use getAllPinsFromDb from the database.js inside router.get

module.exports = (db) => {
  router.get("/", (req, res) => {
    // const pinsData = getAllPinsFromDb().then((result) => {
    //   console.log(result[0]);
    //   return result[0];
    // });
    console.log(req.session);
    const templateVars = {};
    if (!req.session) {
      templateVars.user = null;
      templateVars.id = null;
    } else {
      templateVars.user = req.session.username;
      templateVars.id = req.session.user_id;
    }
    getAllMaps(db)
      .then(allMaps => {
        templateVars.allMaps = allMaps;
        templateVars.mapName = null;
        console.log(templateVars);
        res.render('maps_index', templateVars);
      });
  });

  // GET /maps/:id to view specific map based on map's id.
  router.get("/:id", (req, res) => {
    const mapID = req.params.id;
    const templateVars = {};
    if (!mapID) {
      res.statusCode = 404;
      if (!req.session.user_id) {
        templateVars.user = null;
        templateVars.id = null;
        templateVars.mapName = null;
      } else {
        templateVars.user = req.session.username;
        templateVars.id = req.session.user_id;
        templateVars.mapName = null;
      }
      res.render('404', templateVars);
    }
    const requestedMapId = mapID;
    getMapById(db, requestedMapId)
      .then(requestedMap => {
        templateVars.requestedMap = requestedMap;
        if (!req.session) {
          templateVars.user = null;
          templateVars.id = null;
        } else {
          templateVars.user = req.session.username;
          templateVars.id = req.session.user_id;
        }
        templateVars.mapName = requestedMap.title;
        res.render('maps_show', templateVars);
      })
      .catch((err) => {
        res.statusCode = 404;
        templateVars.mapName = null;
        res.render('404', templateVars);
      });
  });

  // Add a new map to db only if logged in, then redirect to new map.
  router.post("/", (req, res) => {
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
      const values = req.body;
      const { title, country, city } = values;
      getCoordinates(country, city)
        .then(coordinates => {
          const parsedCoords = JSON.parse(coordinates);
          const resultsArray = parsedCoords.results[0];
          const resultsCoords = resultsArray.locations[0];
          const latitude = resultsCoords.latLng.lat;
          const longitude = resultsCoords.latLng.lng;
          const user_id = req.session.user_id;
          const map = {
            title,
            country,
            city,
            latitude,
            longitude,
            created_at: new Date(),
            user_id
          };
          createNewMap(db, map)
            .then(newMap => {
              res.redirect(`/maps/${newMap.id}`);
            })
            .catch((err) => {
              console.log("query error", err.stack);
              res.statusCode = 400;
              templateVars.mapName = null;
              templateVars.message = "Oops, something went wrong.";
              res.render('400', templateVars);
            });
        });
    }
  });

  // GET /maps/:id/edit page to edit map title.

  router.get("/:id/edit", (req, res) => {
    const templateVars = {};
    if (!req.session.user_id) {
      templateVars.user = null;
      templateVars.id = null;
      templateVars.mapName = null;
      res.statusCode = 401;
      res.render('401', templateVars);
    } else {
      const requestedMapId = req.params.id;
      getMapById(db, requestedMapId)
        .then(requestedMap => {
          templateVars.ownerIsLoggedIn = req.session.user_id === requestedMap.user_id;
          templateVars.mapEdit = requestedMap.title;
          templateVars.mapName = null;
          templateVars.mapID = req.params.id;
          templateVars.user = req.session.username;
          templateVars.id = req.session.user_id;
          res.render('maps_edit', templateVars);
        });
    }
  });

  // Update a map as owner of map only, then redirect back to user's profile.

  router.post("/:id", (req, res) => {
    const userID = req.session.user_id;
    const requestedMapId = req.params.id;
    const mapDetails = {
      title: req.body.newTitle
    };
    updateMap(db, requestedMapId, mapDetails)
      .then(() => {
        res.redirect(`/users/${userID}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Delete a map as owner of map only from user's own profile, then refresh page. Does not delete from db, rather changes 'removed_at' from NULL to Date.
  router.post("/:id/delete", (req, res) => {
    const templateVars = {};
    if (!req.session.user_id) {
      templateVars.user = null;
      templateVars.id = null;
      templateVars.mapName = null;
      res.statusCode = 401;
      res.render('401', templateVars);
    } else {
      const mapID = req.params.id;
      const userID = req.session.user_id;
      deleteMap(db, mapID)
        .then(dbres => {
          res.redirect(`/users/${userID}`);
        })
        .catch((err) => {
          console.log("query error", err.stack);
          res.statusCode = 400;
          templateVars.message = "Oops, something went wrong.";
          templateVars.mapName = null;
          res.render('400', templateVars);
        });
    }
  });



// Add a new pin to db
  router.post("/:id/pins", (req, res) => {
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
      let queryString = `
        INSERT INTO pins (title, description, image_url, latitude, longitude, created_at, map_id, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
      `;
      // req.body = {} from the submit form for new pin
      let user_id = req.session.user_id;
      let map_id = req.params.id;
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
        map_id,
        user_id
      ])
        .then((data) => {
          console.log("data.rows from post", data.rows);
          return data.rows;
        })
        .catch((err) => console.error("query error", err.stack));
      // console.log([values.title, values.description]);
      res.redirect(`/maps/${map_id}`);
    }
  });

  // instead of res.redirect which refreshes the page, do res.json(data.rows[0]) to the popup with AJAX
  //return data.rows[0] send only the single object back to the client side (due to RETURNING *) -> addPinFromDb only with that single object

  //  // Remove pins from maps.js
  // router.post("/:id/delete", (req, res) => {
  //   console.log("id from maps.js delete:", req.params.id);
  //   const templateVars = {};
  //   if (!req.session.user_id) {
  //     templateVars.user = null;
  //     templateVars.id = null;
  //     templateVars.mapName = null;
  //     res.statusCode = 401;
  //     res.render('401', templateVars);
  //   } else {
  //     templateVars.user = req.session.username;
  //     templateVars.id = req.session.user_id;
  //     let values = [req.params.id];
  //     let queryString = `
  //       DELETE FROM pins
  //       WHERE id = $1;`;

  //     db.query(queryString, values)
  //       .then((data) => console.log(data))
  //       .catch((err) => console.lerror("query error", err.stack));

  //     res.redirect("/maps");
  //   }
  // });

  return router;
};
