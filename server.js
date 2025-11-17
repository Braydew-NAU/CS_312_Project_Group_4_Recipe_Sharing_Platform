// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false
  })
);

// Make user available in ALL views (header, etc.)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Mount route modules
app.use(authRoutes);    // /signin, /auth/login, /auth/register, /logout
app.use(recipeRoutes);  // /, /create, /recipes/create, /recipe/:id, /search
app.use(userRoutes);    // /profile, /recipe/:id/save

// 404 fallback
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`PlatePal running on http://localhost:${PORT}`);
});
