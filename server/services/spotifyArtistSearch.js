const axios = require('axios');
const config = require('../config');
const { spotifyTemporaryToken } = config;

const spotifyArtistSearch = async name => {
  try {
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${name}&type=artist&market=US&limit=5`,
      headers: {
        Authorization: `Bearer ${spotifyTemporaryToken}`,
      },
    };
    return await axios(config).then(response => response.data.artists.items);
  } catch (e) {
    throw new Error('spotifyArtistSearch error: ' + e.message);
  }
};

module.exports = spotifyArtistSearch;
