const express = require('express')
const router = express.Router()
const controllers = require('../controllers');

router.get('/playlist', controllers.sendPlaylist);
router.get('/location-search', controllers.sendPotentialLocations);
router.post('/signup', controllers.createUser);
router.post('/token', controllers.handleToken);
// router.post('/login', controllers.verifyUser);

module.exports = router;
