const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getAllPinsFromDb = function () {
  let queryString = `SELECT * FROM pins;`;
  return db
    .query(queryString)
    .then((data) => data.rows)
    .catch((err) => console.error("query error", err.stack));
};

exports.getAllPinsFromDb = getAllPinsFromDb;
