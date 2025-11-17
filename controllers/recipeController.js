// controllers/recipeController.js
const Recipe = require('../models/Recipe');
const Rating = require('../models/Rating');
const Comment = require('../models/Comment');

async function listHome(req, res) {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.render('index', { recipes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading recipes');
  }
}

function renderCreateForm(req, res) {
  if (!req.session.user) return res.redirect('/signin');
  res.render('createRecipe', { error: null });
}

async function createRecipe(req, res) {
  try {
    if (!req.session.user) return res.redirect('/signin');

    const {
      title,
      image_url,
      ingredients,
      instructions,
      cuisine,
      cooking_time,
      difficulty,
      meal_type
    } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.render('createRecipe', { error: 'Title, ingredients, and instructions are required.' });
    }

    const recipe = await Recipe.createRecipe(
      req.session.user.id,
      title,
      image_url || '',
      ingredients,
      instructions,
      cuisine || '',
      cooking_time || 0,
      difficulty || 'Easy',
      meal_type || ''
    );

    res.redirect(`/recipe/${recipe.id}`);
  } catch (err) {
    console.error(err);
    res.render('createRecipe', { error: 'Error creating recipe.' });
  }
}

async function viewRecipe(req, res) {
  try {
    const id = req.params.id;
    const recipe = await Recipe.getRecipeById(id);
    if (!recipe) return res.status(404).send('Recipe not found');

    const ratingInfo = await Rating.getAverageRating(id);
    const comments = await Comment.getCommentsForRecipe(id);

    res.render('recipe', {
      recipe,
      rating: ratingInfo ? Number(ratingInfo.avg).toFixed(1) : null,
      ratingCount: ratingInfo ? ratingInfo.count : 0,
      comments
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading recipe');
  }
}

async function searchRecipes(req, res) {
  try {
    const q = req.query.q || '';
    const recipes = q ? await Recipe.searchRecipes(q) : await Recipe.getAllRecipes();
    res.render('index', { recipes, searchQuery: q });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching recipes');
  }
}

module.exports = {
  listHome,
  renderCreateForm,
  createRecipe,
  viewRecipe,
  searchRecipes
};
