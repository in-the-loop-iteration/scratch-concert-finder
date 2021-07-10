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
		console.log('existingUser is: ', existingUser);
		//if user already existed, return email in use
		if (existingUser)
			return res.status(400).json({ message: 'email already used' });

		//hashed user's password, with 12 rounds
		const hashedPassword = await bcrypt.hash(password, 12);

		//create new user
		const newUser = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});
		console.log('newUser is: ', newUser);
		return res.status(200).json({ message: 'newUser created' });
	} catch (error) {
		res.status(500).json({ message: 'something went wrong at signUp' });
		console.log('err in signUp controller: ', error);
	}
};

userController.logIn = async (req, res) => {
	//getting userInfo from req.body
	console.log('hitting logIn');
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		//console.log('existingUser in logIn is: ', existingUser);

		// if existingUser is undefine, return user not found
		if (!existingUser)
			return res.status(404).json({ message: 'User not found' });

		//after retrieving userInfo, compare bcrypt password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		//if password is not correct, return incorrect password
		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Incorrect Password' });

		//JWT token, user session will expire in 1 hour
		// ? what else should include in the JWT to send to the client side?
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			'process.env.ACCESS_TOKEN_SECRET',
			{ expiresIn: '1h' }
		);

		res.status(200).json({ accessToken: token });
	} catch (error) {
		console.log('signIn controllers Error: ', error);
		res.status(500).json({ message: 'something went wrong at logIn' });
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
