const bcrypt = require('bcrypt');
const saltRounds = 10;


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
  `, [user])
    .then(res => res.rows);
};

// getMapById helper function to retrieve name of map for specific map id.

const getMapById = function(db, map) {
  return db.query(`
  SELECT *
  FROM maps
  WHERE id = $1
  `, [map])
    .then(res => res.rows);
};

// getPinsForMapById helper function to retrieve all pins for specific map id.

const getPinsForMapById = function(db, map) {
  return db.query(`
  SELECT *
  FROM pins
  WHERE map_id = $1
  `, [map])
    .then(res => res.rows);
};

module.exports = { getUserByUsername, getUserByEmail, getUserById, addUser, getUserMaps, getUserFaves, getUserPins, getMapById, getPinsForMapById };
