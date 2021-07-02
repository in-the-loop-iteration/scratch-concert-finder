const axios = require('axios');
const qs = require('qs');
const config = require('../config');

const spotifyAccessTokenOAuth = async (code) => {
  const { spotifyClientId, spotifyClientSecret } = config;
  try {
    const encodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    );
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:8080/callback',
    });
    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token/',
      headers: {
        Authorization: `Basic ${encodedIdAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    const res = await axios(config).then((response) => response.data);
    return res;
  } catch (e) {
    throw new Error('spotifyAccessTokenOAuth error: ' + e.message);
  }
};

module.exports = spotifyAccessTokenOAuth;
