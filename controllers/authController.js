// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

function renderSignin(req, res) {
  res.render('signin', {
    loginError: null,
    registerError: null
  });
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.render('signin', {
        loginError: null,
        registerError: 'All fields are required.'
      });
    }
    const existing = await User.findUserByEmail(email);
    if (existing) {
      return res.render('signin', {
        loginError: null,
        registerError: 'Email already exists.'
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, email, hash);
    req.session.user = { id: user.id, username: user.username, email: user.email };
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.render('signin', {
      loginError: null,
      registerError: 'Server error. Please try again.'
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render('signin', {
        loginError: 'All fields are required.',
        registerError: null
      });
    }
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.render('signin', {
        loginError: 'Invalid credentials.',
        registerError: null
      });
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.render('signin', {
        loginError: 'Invalid credentials.',
        registerError: null
      });
    }
    req.session.user = { id: user.id, username: user.username, email: user.email };
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.render('signin', {
      loginError: 'Server error. Please try again.',
      registerError: null
    });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

module.exports = {
  renderSignin,
  register,
  login,
  logout
};
