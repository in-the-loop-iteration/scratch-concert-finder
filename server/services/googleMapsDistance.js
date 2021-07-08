const axios = require('axios');
const config = require('../config');
const { googleMapsApiKey } = config;

const googleMapsDistance = async ({ pointA, pointB }) => {
  try {
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${pointA}&destinations=${pointB}&mode=driving&units=imperial&key=${googleMapsApiKey}`,
      headers: {},
    };
    return await axios(config).then((response) => {
      if (response.data.rows.length > 0) {
        return response.data.rows[0].elements[0].distance.text;
      } else {
        return 'distance not found';
      }
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = googleMapsDistance;
