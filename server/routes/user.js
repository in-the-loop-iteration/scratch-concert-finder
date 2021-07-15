const express = require('express');
const router = express.Router();
const {
	signUp,
	logIn,
	favorite,
	unfavorite,
	AllFavorites,
} = require('../controllers/user');

// sign in a user
// link will be: http://localhost:3000/user/login
router.post('/login', logIn);

// sign up a new user
// link will be: http://localhost:3000/user/signup
router.post('/signup', signUp);

// add a concert to the concert
// link will be: http://localhost:3000/user/fav/{user id}
router.put('/fav/:id', favorite);

// remove a favorite
// link will be: http://localhost:3000/user/fav/{user id}
router.delete('/fav/:id', unfavorite);

// retreive all favorite
// link will be: http://localhost:3000/user/fav/{user id}
router.get('/fav/:id', AllFavorites);

module.exports = router;
