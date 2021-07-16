require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PORT,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  ticketmasterApiKey: process.env.TICKETMASTER_API_KEY,
};

module.exports = config;
