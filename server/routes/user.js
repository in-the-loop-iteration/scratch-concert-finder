const express = require('express');
const router = express.Router();
const { signUp, logIn } = require('../controllers/user');

// sign in a user
// link will be: http://localhost:3000/user/login
router.post('/login', logIn);

// sign up a new user
// link will be: http://localhost:3000/user/signup
router.post('/signup', signUp);

module.exports = router;
