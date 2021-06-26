const moment = require('moment');
const axios = require('axios');
const qs = require('qs');

const config = require('../config');

const { spotifyClientId, spotifyClientSecret } = config;

const spotifyAccessToken = async (name) => {
  try {
    // Lookup token information in db PENDING TABLE SETUP
    const spotifyToken =
      'BQDwmo-Bti3LSKtb3UiPgFwpDEmXBku6q_S9AnD8j9st6GzTxlZaX2BNcxsZOI7ah5JxtAA7gGXlQlW-jZw';
    const spotifyTokenGeneratedAt = moment();
    // If token hasn't expired (1 hour), return the token
    if (spotifyToken && moment() <= spotifyTokenGeneratedAt.add(1, 'hour')) return spotifyToken;
    // Generate a new Spotify access token
    const encodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    );
    const data = qs.stringify({ grant_type: 'client_credentials' });
    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token/',
      headers: {
        Authorization: `Basic ${encodedIdAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie:
          '__HOST-sp_fid=a7da538e-87c8-45a4-a501-dacffb886502; __Host-device_id=AQAffng0g1h-tannBBHECzx_Ovl6sFYgUvDdLqJylYk5MzfhNJ194FiLIjlVz9Tgb32fDruNPjvGBFr9r0yrKqFdIJSh54XPlwE',
      },
      data: data,
    };
    const newToken = await axios(config).then((response) => response.data.access_token);
    // Store token to the db PENDING TABLE SETUP
    return newToken;
  } catch (e) {
    throw new Error('spotifyAccessToken error: ' + e.message);
  }
};

module.exports = spotifyAccessToken;
