const router = require('express').Router();
const controllers = require('../controllers/index');

// modularize routes with anonymous functions and middlewares to be shared between routes
// router.get('/playlist', controllers.sendPlaylist);
router.post('/playlist', controllers.sendPlaylist);
// router.get('/location-search', controllers.sendPotentialLocations);
router.post('/location-search', controllers.sendPotentialLocations);
// router.post('/token', controllers.handleToken);
// router.post('/spotify-token', controllers.sendSpotifyOAuthToken);

// router.post('/signup', controllers.createUser);
// router.post('/login', controllers.verifyUser);
router.get('/user/:id', controllers.sendUserDetails);

module.exports = router;
