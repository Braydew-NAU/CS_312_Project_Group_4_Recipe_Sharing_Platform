// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Profile page
router.get('/profile', userController.profilePage);

// Save recipe
router.post('/recipe/:id/save', userController.saveRecipe);

module.exports = router;
