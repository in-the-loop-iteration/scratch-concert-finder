const axios = require('axios');
const config = require('../config');
const { predictHqClientTemporaryToken } = config;

const getPlaylist = async location => {
  try {
    const latLong = '34.420830,-119.698189';
    const radius = 50;
    const config = {
      method: 'get',
      url: `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${latLong}&location_around.scale=${radius}mi`,
      headers: {
        Authorization: `Bearer ${predictHqClientTemporaryToken}`,
      },
    };
    const predictHQConcerts = await axios(config).then(response => response.data.results);
    const playlist = [];
    for (const concert of predictHQConcerts) {
      const artistSongs = await getArtistSongs(concert.title);
      const { entities, location, start, end } = concert;
      const venue = entities[0];
      playlist.push(
        ...artistSongs.map(song => ({
          ...song,
          location,
          venue: venue.name,
          address: venue.formatted_address,
          start,
          end,
          distance: 1.4,
        }))
      );
    }
    return playlist;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getArtistSongs = async artist => {
  try {
    let songs = [{
        title: 'top hit'
    }];
    // lookup artist on spotify
    // if result
    // pull top three songs for the artist
    // if no songs return empty array
    // if songs, push to songs arr
    // if no result
    // separate name by commas and lookup each name follow the process above
    return songs;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getPlaylist,
};
