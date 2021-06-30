const moment = require('moment');
const axios = require('axios');
const qs = require('qs');

const config = require('../config');

const { spotifyClientId, spotifyClientSecret } = config;

const spotifyAccessToken = async (name) => {
  try {
    // Lookup token information in db PENDING TABLE SETUP
    const spotifyToken =
      'BQBDnqoNNv09570dKlwl-zZATUdjys4IleL97H55sjla8wKB1k71csDScOb7fug-EVGH0w9CYXcPk2M7XiJQCM32cjzwuRkd9LkV331G0D1DyRgDEuXMO_60eZmPiJouTxtao0nS4hhxIzhJcDANrEz4VoD59hKrmmImSlJOu--hgkRpZWXeZLyctWB3e2c&refresh_token=AQCHjz6yX-Pw-SS0pkk7Ae9jmVhiVe0Dndhp9mXGf7Qkxuzj7f3qzMY7Fu0H7s9953t5gMBMSUnPYqehbU9H2iIu7p8w2CAjkPEe6xoXwH5Tli352Pmz7qRiVZIPq6RVsdE';
    const spotifyTokenGeneratedAt = moment();
    // If token hasn't expired (1 hour), return the token
    if (spotifyToken && moment() <= spotifyTokenGeneratedAt.add(1, 'hour')) return spotifyToken;
    // Generate a new Spotify access token
    const encodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    );
    var scope = 'user-read-private user-read-email user-read-playback-state streaming user-modify-playback-state';
    const data = qs.stringify({ grant_type: 'client_credentials', scope: scope });
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
