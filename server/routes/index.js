const router = require('express').Router();
const controllers = require('../controllers/index');

// modularize routes with anonymous functions and middlewares to be shared between routes
router.post('/playlist', controllers.sendPlaylist);
router.post('/location-search', controllers.sendPotentialLocations);

router.get('/user/:id', controllers.sendUserDetails);

module.exports = router;
