// models/User.js
const pool = require('../db');

async function createUser(username, email, passwordHash) {
  const res = await pool.query(
    `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
    [username, email, passwordHash]
  );
  return res.rows[0];
}

async function findUserByEmail(email) {
  const res = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return res.rows[0];
}

async function findUserById(id) {
  const res = await pool.query(
    'SELECT id, username, email FROM users WHERE id = $1',
    [id]
  );
  return res.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
