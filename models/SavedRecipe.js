// models/SavedRecipe.js
const pool = require('../db');

async function saveRecipe(userId, recipeId) {
  const res = await pool.query(
    `INSERT INTO saved_recipes (user_id, recipe_id)
     VALUES ($1,$2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [userId, recipeId]
  );
  return res.rows[0];
}

async function getSavedRecipesForUser(userId) {
  const res = await pool.query(
    `SELECT r.*
     FROM saved_recipes s
     JOIN recipes r ON s.recipe_id = r.id
     WHERE s.user_id = $1
     ORDER BY r.id DESC`,
    [userId]
  );
  return res.rows;
}

module.exports = {
  saveRecipe,
  getSavedRecipesForUser
};
