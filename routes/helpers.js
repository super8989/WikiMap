const bcrypt = require('bcrypt');
const { request } = require('express');
const saltRounds = 10;
const env = require("dotenv").config({ path: "./.env" });
const GEOCODING_API_KEY = env.GEOCODING_API_KEY;
const requestPromise = require('request-promise-native');
const nodeSassMiddleware = require('node-sass-middleware');

// getUserByUsername helper function to check if username already registered.

const getUserByUsername = function(db, submittedUsername) {
  return db.query(`
  SELECT *
  FROM users
  WHERE username ~* $1
  `, [`^${submittedUsername}$`])
    .then(res => res.rows[0]);
};

// getUserByEmail helper function to check if email already registered.

const getUserByEmail = function(db, submittedEmail) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email ~* $1
  `, [`^${submittedEmail}$`])
    .then(res => res.rows[0]);
};

// getUserById helper function to get username with user's ID.

const getUserById = function(db, submittedId) {
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [submittedId])
    .then(res => res.rows[0]);
};

// addUser helper function to add new user to database if email and password are valid.

const addUser = function(db, user) {
  user.password = bcrypt.hashSync(user.password, saltRounds);
  return db.query(`
  INSERT INTO users (username, email, password, created_at)
  VALUES ($1, $2, $3, now()::date)
  RETURNING *
  `, [user.username, user.email, user.password])
    .then(res => res.rows[0]);
};

// getUserMaps helper function to retrieve title of maps owned by user.

const getUserMaps = function(db, user) {
  return db.query(`
  SELECT title, id
  FROM maps
  WHERE maps.user_id = $1
  AND maps.removed_at IS NULL
  `, [user])
    .then(res => res.rows);
};

// getUserFaves helper function to retrieve title of maps favourited by user.

const getUserFaves = function(db, user) {
  return db.query(`
  SELECT maps.title, maps.id
  FROM user_favourites
  JOIN maps on user_favourites.map_id = maps.id
  WHERE user_favourites.user_id = $1
  AND user_favourites.removed_at IS NULL
  AND maps.removed_at IS NULL
  `, [user])
    .then(res => res.rows);
};

// getUserPins helper function to retrieve title of maps user has contributed pins to.

const getUserPins = function(db, user) {
  return db.query(`
  SELECT DISTINCT maps.title, maps.id
  FROM pins
  JOIN maps ON pins.map_id = maps.id
  WHERE pins.user_id = $1
  AND pins.removed_at IS NULL
  `, [user])
    .then(res => res.rows);
};

// getMapById helper function to retrieve name of map for specific map id.

const getMapById = function(db, map) {
  return db.query(`
  SELECT *
  FROM maps
  WHERE id = $1
  AND maps.removed_at IS NULL
  `, [map])
    .then(res => res.rows[0]);
};

// getPinsForMapById helper function to retrieve all pins for specific map id.

const getPinsForMapById = function(db, map) {
  return db.query(`
  SELECT *
  FROM pins
  WHERE map_id = $1
  AND pins.removed_at IS NULL
  `, [map])
    .then(res => res.rows);
};

// getCoordinates helper function that makes an API request to get lat and long of country and city when user creates new map.

const getCoordinates = function(country, city) {
  return requestPromise(`https://www.mapquestapi.com/geocoding/v1/address?key=${GEOCODING_API_KEY}&inFormat=kvp&outFormat=json&location=${city}%2C+${country}`);
};

// createNewMap helper function to add new map to database.

const createNewMap = function(db, map) {
  return db.query(`
  INSERT INTO maps (title, country, city, latitude, longitude, created_at, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `, [map.title, map.country, map.city, map.latitude, map.longitude, map.created_at, map.user_id])
    .then(res => res.rows[0]);
};

// getAllMaps helper function to retrieve title and creator of all maps.

const getAllMaps = function(db) {
  return db.query(`
  SELECT DISTINCT maps.title, maps.id, users.username
  FROM maps
  JOIN users on maps.user_id = users.id
  WHERE maps.removed_at IS NULL
  `)
    .then(res => res.rows);
};

// updateMap helper function to update title of user's own map.

const updateMap = function(db, mapID, mapDetails) {
  return db.query(`
  UPDATE maps
  SET title = $1
  WHERE id = $2
  `, [mapDetails.title, mapID])
    .then(res => res.rows);
};

// deleteMap helper function to delete user's own map (does not remove from db, rather changes 'removed_at' from NULL to Date stamp.).

const deleteMap = function(db, mapID) {
  return db.query(`
  UPDATE maps
  SET removed_at = now()::date
  WHERE maps.id = $1
  `, [mapID])
    .then(res => res.rows);
};

// updatePin helper function to update title and/or description of pin.

const updatePin = function(db, pinID, pinDetails) {
  return db.query(`
  UPDATE pins
  SET title = $1,
  description = $2
  WHERE id = $3
  `, [pinDetails.title, pinDetails.description, pinID])
    .then(res => res.rows);
};

module.exports = { getUserByUsername, getUserByEmail, getUserById, addUser, getUserMaps, getUserFaves, getUserPins, getMapById, getPinsForMapById, getCoordinates, createNewMap, getAllMaps, updateMap, deleteMap, updatePin };
