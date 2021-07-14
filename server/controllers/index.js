const { getPlaylist } = require('../services/getPlaylist');
const {
	getLocationSearchResults,
} = require('../services/getLocationSearchResults');
const { getUserDetails } = require('../services/getUserDetails');
const spotifyAccessToken = require('../services/spotifyAccessToken');
const spotifyAccessTokenOAuth = require('../services/spotifyAccessTokenOAuth');
const Token = require('../db/index');

// improve the directory hierarchy by splitting middlewares in different files

const handleToken = async (req, res, next) => {
	let { tokenId } = req.query;
	if (!tokenId) return next('No token!');
	try {
		tokenId = await spotifyAccessToken(tokenId);
		res.status(200).json(tokenId);
		//next();
	} catch (e) {
		console.log(e.message);
		res.sendStatus(500) && next(e);
	}
};

const sendPlaylist = async (req, res, next) => {
	try {
		const playlist = await getPlaylist(req.body);
		res.status(200).json(playlist);
		//next();
	} catch (e) {
		console.log(e.message);
		res.sendStatus(500);
		//next(e);
	}
};

const sendPotentialLocations = async (req, res, next) => {
	const { searchQuery } = req.body;
	try {
		const searchResults = await getLocationSearchResults(searchQuery);
		res.status(200).json(searchResults);
		//next();
	} catch (e) {
		console.log(e.message);
		res.sendStatus(500);
		///next(e);
	}
};

const sendUserDetails = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await getUserDetails(id);
		res.status(200).json(user);
		//next();
	} catch (e) {
		console.log(e.message);
		res.sendStatus(500);
		//next(e);
	}
};

// double check whether this functionality is already in place
const sendSpotifyOAuthToken = async (req, res, next) => {
	const { code } = req.body;
	try {
		console.log('code: ', code);
		let token;
		if (code) {
			const newSpotifyToken = await spotifyAccessTokenOAuth(code);
			token = newSpotifyToken.access_token;
		} else {
			const spotifyToken = await Token.findOne({ source: 'Spotify OAuth' })
				.limit(1)
				.sort({ $natural: -1 });
			console.log('spotifyToken: ', spotifyToken);
			token = spotifyToken ? spotifyToken.tokenId : null;
		}
		res.status(200).json(token);
		//next();
	} catch (e) {
		console.log(e.message);
		res.sendStatus(500);
		//next(e);
	}
};

module.exports = {
	handleToken,
	sendPlaylist,
	sendPotentialLocations,
	sendUserDetails,
	sendSpotifyOAuthToken,
};
