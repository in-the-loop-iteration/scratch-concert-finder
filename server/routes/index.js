const router = require('express').Router();
const controllers = require('../controllers');

router.post('/playlist', controllers.sendPlaylist);
router.post('/location-search', controllers.sendPotentialLocations);

module.exports = router;
