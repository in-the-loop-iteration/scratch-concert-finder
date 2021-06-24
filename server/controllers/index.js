const { getPlaylist } = require('../services/getPlaylist');

const sendPlaylist = async (req, res, next) => {
  const { address } = req.body;
  try {
    const playlist = await getPlaylist(address);
    res.status(200).json(playlist);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

module.exports = {
  sendPlaylist,
};
