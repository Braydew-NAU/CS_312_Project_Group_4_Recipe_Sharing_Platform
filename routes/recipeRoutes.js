// routes/recipeRoutes.js
const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

// Home page - list recipes
router.get('/', recipeController.listHome);

// Create recipe form + submit
router.get('/create', recipeController.renderCreateForm);
router.post('/recipes/create', recipeController.createRecipe);

// View single recipe
router.get('/recipe/:id', recipeController.viewRecipe);

// Search
router.get('/search', recipeController.searchRecipes);

module.exports = router;
