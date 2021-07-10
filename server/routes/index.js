const router = require('express').Router();
const controllers = require('../controllers/index');

// modularize routes with anonymous functions and middlewares to be shared between routes
router.get('/playlist', controllers.sendPlaylist);
router.get('/location-search', controllers.sendPotentialLocations);
// router.post('/signup', controllers.createUser);
router.post('/token', controllers.handleToken);
// router.post('/login', controllers.verifyUser);
router.post('/playlist', controllers.sendPlaylist);
router.post('/location-search', controllers.sendPotentialLocations);
router.get('/user/:id', controllers.sendUserDetails);
router.post('/spotify-token', controllers.sendSpotifyOAuthToken);

module.exports = router;
