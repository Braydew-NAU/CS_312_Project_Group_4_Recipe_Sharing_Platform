// models/Comment.js
const pool = require('../db');

async function addComment(userId, recipeId, text) {
  const res = await pool.query(
    `INSERT INTO comments (user_id, recipe_id, text)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [userId, recipeId, text]
  );
  return res.rows[0];
}

async function getCommentsForRecipe(recipeId) {
  const res = await pool.query(
    `SELECT c.*, u.username
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE recipe_id = $1
     ORDER BY c.created_at DESC`,
    [recipeId]
  );
  return res.rows;
}

module.exports = {
  addComment,
  getCommentsForRecipe
};
