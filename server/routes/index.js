const express = require('express')
const router = express.Router()
const controllers = require('../controllers');

router.get('/playlist', controllers.sendPlaylist);

module.exports = router;
