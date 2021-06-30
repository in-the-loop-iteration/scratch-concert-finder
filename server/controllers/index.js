const { getPlaylist } = require('../services/getPlaylist');
const { getLocationSearchResults } = require('../services/getLocationSearchResults');

const sendPlaylist = async (req, res, next) => {
  try {
    const playlist = await getPlaylist(req.body);
    res.status(200).json(playlist);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
};

const sendPotentialLocations = async (req, res, next) => {
  const { searchQuery } = req.body;
  try {
    const searchResults = await getLocationSearchResults(searchQuery);
    res.status(200).json(searchResults);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
};

module.exports = {
  sendPlaylist,
  sendPotentialLocations,
};
