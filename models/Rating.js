// models/Rating.js
const pool = require('../db');

async function addRating(userId, recipeId, rating) {
  const res = await pool.query(
    `INSERT INTO ratings (user_id, recipe_id, rating)
     VALUES ($1,$2,$3)
     ON CONFLICT (user_id, recipe_id)
     DO UPDATE SET rating = EXCLUDED.rating
     RETURNING *`,
    [userId, recipeId, rating]
  );
  return res.rows[0];
}

async function getAverageRating(recipeId) {
  const res = await pool.query(
    'SELECT AVG(rating) AS avg, COUNT(*) AS count FROM ratings WHERE recipe_id = $1',
    [recipeId]
  );
  return res.rows[0]; // { avg, count }
}

module.exports = {
  addRating,
  getAverageRating
};
