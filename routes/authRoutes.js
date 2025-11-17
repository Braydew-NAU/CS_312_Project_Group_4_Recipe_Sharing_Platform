// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Combined sign-in page (login + register tabs)
router.get('/signin', authController.renderSignin);

// Login / Register actions
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
