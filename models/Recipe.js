// models/Recipe.js
const pool = require('../db');

async function createRecipe(userId, title, imageUrl, ingredients, instructions, cuisine, cookingTime, difficulty, mealType) {
  const res = await pool.query(
    `INSERT INTO recipes
     (user_id, title, image_url, ingredients, instructions, cuisine, cooking_time, difficulty, meal_type)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [userId, title, imageUrl, ingredients, instructions, cuisine, cookingTime, difficulty, mealType]
  );
  return res.rows[0];
}

async function getAllRecipes() {
  const res = await pool.query(
    'SELECT * FROM recipes ORDER BY id DESC'
  );
  return res.rows;
}

async function getRecipeById(id) {
  const res = await pool.query(
    'SELECT * FROM recipes WHERE id = $1',
    [id]
  );
  return res.rows[0];
}

async function getRecipesByUser(userId) {
  const res = await pool.query(
    'SELECT * FROM recipes WHERE user_id = $1 ORDER BY id DESC',
    [userId]
  );
  return res.rows;
}

async function searchRecipes(keyword) {
  const q = `%${keyword}%`;
  const res = await pool.query(
    `SELECT * FROM recipes
     WHERE LOWER(title) LIKE LOWER($1)
        OR LOWER(ingredients) LIKE LOWER($1)
        OR LOWER(cuisine) LIKE LOWER($1)
     ORDER BY id DESC`,
    [q]
  );
  return res.rows;
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUser,
  searchRecipes
};
