const axios = require('axios');
const config = require('../config');
const { predictHqClientTemporaryToken } = config;

const predictHQConcerts = async location => {
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
    return await axios(config).then(response => response.data.results);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = predictHQConcerts;
