// controllers/userController.js
const Recipe = require('../models/Recipe');
const SavedRecipe = require('../models/SavedRecipe');

async function profilePage(req, res) {
  if (!req.session.user) return res.redirect('/signin');

  try {
    const userId = req.session.user.id;
    const uploadedRecipes = await Recipe.getRecipesByUser(userId);
    const savedRecipes = await SavedRecipe.getSavedRecipesForUser(userId);
    res.render('profile', { uploadedRecipes, savedRecipes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading profile');
  }
}

async function saveRecipe(req, res) {
  if (!req.session.user) return res.redirect('/signin');

  try {
    const userId = req.session.user.id;
    const recipeId = req.params.id;
    await SavedRecipe.saveRecipe(userId, recipeId);
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving recipe');
  }
}

module.exports = {
  profilePage,
  saveRecipe
};
