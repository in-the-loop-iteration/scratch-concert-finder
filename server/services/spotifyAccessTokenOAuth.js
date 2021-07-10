const axios = require('axios');
const qs = require('qs');
const moment = require('moment');

const config = require('../config');
<<<<<<< HEAD
const Token = require('../db/index');

const spotifyAccessTokenOAuth = async (code) => {
	const { spotifyClientId, spotifyClientSecret } = config;
	console.log(spotifyClientId, ' ', spotifyClientSecret);
	try {
		const encodedIdAndSecret = Buffer.from(
			`${spotifyClientId}:${spotifyClientSecret}`
		).toString('base64');
		console.log(encodedIdAndSecret);
		const data = qs.stringify({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: 'http://localhost:8080/callback',
		});
		console.log(data);
		const config = {
			method: 'post',
			url: 'https://accounts.spotify.com/api/token/',
			headers: {
				Authorization: `Basic ${encodedIdAndSecret}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				// 'Access-Control-Allow-Origin': '*',
				// 'Access-Control-Allow-Credentials': 'true',
				// 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
				// 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			},
			data: data,
		};
		console.log(config);
		const token = await axios(config).then((response) => {
			console.log('response: ', response);
			return response.data;
		});
		console.log('token:', token);
		const dbPayload = {
			source: 'Spotify OAuth',
			tokenId: token.access_token,
			timestamp: moment(),
		};
		await new Token(dbPayload).save();
		return token;
	} catch (e) {
		throw new Error('spotifyAccessTokenOAuth error: ' + e.message);
	}
=======
const { Token } = require('../db/index');

const spotifyAccessTokenOAuth = async (code) => {
  const { spotifyClientId, spotifyClientSecret } = config;
  console.log(spotifyClientId, ' ', spotifyClientSecret);
  try {
    const encodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    );
    console.log(encodedIdAndSecret);
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:8080/callback',
    });
    console.log(data);
    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token/',
      headers: {
        Authorization: `Basic ${encodedIdAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      data: data,
    };
    console.log(config);
    const token = await axios(config).then((response) => {
      console.log('response: ', response);
      return response.data
    });
    console.log('token:', token);
    const dbPayload = {
      source: 'Spotify OAuth',
      tokenId: token.access_token,
      timestamp: moment(),
    };
    await new Token(dbPayload).save();
    return token;
  } catch (e) {
    throw new Error('spotifyAccessTokenOAuth error: ' + e.message);
  }
>>>>>>> 1a915893fcfd4d3384ce25dd8dc9fb78a60b7c09
};

module.exports = spotifyAccessTokenOAuth;
