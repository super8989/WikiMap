const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    const userID = req.session.user_id;
    const mapID = req.params.id;
    // console.log(userID, mapID);
    let values = [userID, mapID];
    let queryString = `
      SELECT * FROM user_favourites
      WHERE user_id = $1 AND map_id = $2 AND removed_at IS NULL`;

    db.query(queryString, values)
      .then(data => {
        // console.log(data.rows)
        // console.log(data.rows.length);
        if (data.rows.length === 0) {
          res.send(false);
        } else  {
          res.send(true);
        }
      })
      .catch((err) => console.log("query error", err.stack));

  });
  router.post('/:id', (req, res) => {
    const userID = req.session.user_id;
    const mapID = parseInt(req.params.id);
    console.log(userID, mapID);
    let values = [userID, mapID];
    let queryString = `
      INSERT INTO user_favourites (created_at, user_id, map_id)
      VALUES (now()::date, $1, $2)`;

    db.query(queryString, values)
      .then(res => res.rows)
      .catch((err) => console.log("query error", err.stack));
    res.send();
  });
  router.post('/:id/delete', (req, res) => {
    const userID = req.session.user_id;
    const mapID = parseInt(req.params.id);
    console.log(userID, mapID);
    let values = [userID, mapID];
    let queryString = `
      UPDATE user_favourites
      SET removed_at = now()::date
      WHERE user_id = $1 AND map_id = $2 AND removed_at IS NULL`;

    db.query(queryString, values)
      .then(res => res.rows)
      .catch((err) => console.log("query error", err.stack));
    res.send();
  });
  return router;
};
