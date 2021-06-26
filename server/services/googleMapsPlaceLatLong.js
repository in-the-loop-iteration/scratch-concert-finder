const axios = require('axios');
const config = require('../config');
const { googleMapsApiKey } = config;

const googleMapsPlaceLatLong = async place_id => {
  try {
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${googleMapsApiKey}`,
      headers: {},
    };
    return await axios(config).then(response => response.data.result.geometry.location);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = googleMapsPlaceLatLong;
