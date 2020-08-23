const bcrypt = require('bcrypt');
const saltRounds = 10;


// getUserByUsername helper function to check if username already registered.

const getUserByUsername = function(db, submittedUsername) {
  return db.query(`
  SELECT *
  FROM users
  WHERE username ~* $1
  `, [submittedUsername])
  .then(res => res.rows[0]);
};

// getUserByEmail helper function to check if email already registered.

const getUserByEmail = function(db, submittedEmail) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, [submittedEmail])
  .then(res => res.rows[0]);
};

// addUser helper function to add new user to database if email and password are valid.

const addUser = function(db, user) {
  user.password = bcrypt.hashSync(user.password, saltRounds);
  return db.query(`
  INSERT INTO users (username, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [user.username, user.email, user.password])
  .then(res => res.rows[0]);
};

module.exports = { getUserByUsername, getUserByEmail, addUser };
