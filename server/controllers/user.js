const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db/user');
require('dotenv').config();

const userController = {};

userController.signUp = async (req, res) => {
	//getting userInfo from req.body
	console.log('hitting signUp');
	// console.log('req.body is:', req.body);
	const { email, password, firstName, lastName } = req.body;

	try {
		// ! find user by email in db, double check
		const existingUser = await User.findOne({ email });
		//console.log('existingUser is: ', existingUser);
		//if user already existed, return email in use
		if (existingUser)
			return res.status(400).json({ message: 'email already used' });

		//hashed user's password, with 12 rounds
		const hashedPassword = await bcrypt.hash(password, 12);

		//create new user
		// convert email to lowercase
		const lowerEmail = email.toLowerCase();
		const newUser = await User.create({
			email: lowerEmail,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});
		console.log('newUser is: ', newUser);
		return res.status(200).json({
			email: lowerEmail,
			name: `${firstName} ${lastName}`,
		});
	} catch (error) {
		res.status(500).json({ message: 'something went wrong at signUp' });
		console.log('err in signUp controller: ', error);
	}
};

userController.logIn = async (req, res) => {
	//getting userInfo from req.body
	console.log('hitting logIn');
	const { email, password } = req.body;
	const lowerEmail = email.toLowerCase();
	console.log(email, password);
	console.log(lowerEmail);
	try {
		const existingUser = await User.findOne({ email: lowerEmail });
		console.log('existingUser in logIn is: ', existingUser);

		// if existingUser is undefine, return user not found
		if (!existingUser)
			return res.status(404).json({ message: 'User not found' });

		//after retrieving userInfo, compare bcrypt password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		//if password is not correct, return incorrect password
		if (!isPasswordCorrect) {
			console.log('Incorrect Password');
			return res.status(400).json({ message: 'Incorrect Password' });
		}

		//JWT token, user session will expire in 1 hour
		// ? what else should include in the JWT to send to the client side?
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			'process.env.ACCESS_TOKEN_SECRET',
			{ expiresIn: '1h' }
		);

		res.status(200).json({
			name: existingUser.name,
			email: existingUser.email,
			id: existingUser._id,
			accessToken: token,
		});
	} catch (error) {
		console.log('signIn controllers Error: ', error);
		res.status(500).json({ message: 'something went wrong at logIn' });
	}
};

userController.favorite = async (req, res) => {
	try {
		// id is user id
		const { id } = req.params;
		//fav is object, contains concert info or artist info
		const fav = req.body;

		// * locate the user by id
		const user = await User.findById(id);
		user.favorites.push(fav);
		//update user db with new favorites
		await User.findByIdAndUpdate(id, {
			favorites: user.favorites,
		});
		//console.log('user.favorites is: ', user.favorites);

		// const testUser = await User.findById(id);
		// console.log('testUser after adding fav is: ', testUser);
		res.status(200).json({
			id: user._id,
			name: user.name,
			favorites: user.favorites,
			log: 'saved into fav',
		});
	} catch (error) {
		console.log('error in favorite: ', error);
		res.status(500).json({ message: error });
	}
};

userController.unfavorite = async (req, res) => {
	try {
		// id is user id
		const { id } = req.params;
		//favId is the position of fav item in fav array
		const favId = req.body.favId;
		const user = await User.findById(id);
		// todo: check if favId is outside the bound of fav length
		if (favId >= user.favorites.length)
			return res.status(500).json('favId is out of bound');
		// splice position takes index position
		const deleted = user.favorites.splice(favId, 1);
		// console.log('deleted is: ', deleted);
		// console.log('user.fav after splice is: ', user.favorites);

		//update db with new fav array
		await User.findByIdAndUpdate(id, { favorites: user.favorites });
		res.status(200).json({
			id: user._id,
			name: user.name,
			favorites: user.favorites,
			deleted: deleted,
			log: 'deleted it from fav',
		});
	} catch (error) {
		console.log('error in unfavorite: ', error);
		res.status(500).json({ message: error });
	}
};

userController.AllFavorites = async (req, res) => {
	try {
		// id is user id
		const { id } = req.params;

		// * locate the user by id
		const user = await User.findById(id);
		console.log('user.favorites is: ', user.favorites);
		//if()
		//user.favorites

		res.status(200).json({
			id: user._id,
			name: user.name,
			favorites: user.favorites,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
/* const createUser = async (req, res, next) => {
	const { name, email, password } = req.query;
	try {
		const newUser = await new User({ name, email, password });
		newUser.save();
		res.locals.id = newUser._doc._id;
		res.status(200).json(newUser);
		//next();
	} catch (e) {
		console.log('createUser error: ', e.message);
		res.sendStatus(500) && next(e);
	}
}; */

// const verifyUser = async (req, res, next) => {
//   const { email, password } = req.query;
//   if(!email || !password) return next('Missing email and/or password');
//   try {
//     const user = await User.findOne({ email });
//     if(!user) return next('User not found');
//     if(!(user.password === password)) return next('Passwords do not match');
//     res.locals.id = user._doc._id;
//     res.status(200).json(user);
//     console.log('verifyUser', res.locals.id);
//     next();
//   }
//   catch(e){
//     console.log('verifyUser error: ', e.message);
//     res.sendStatus(500) && next(e);
//   }
// };

module.exports = userController;
