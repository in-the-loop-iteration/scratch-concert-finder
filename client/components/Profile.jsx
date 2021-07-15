import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Flex,
	InputGroup,
	Text,
	Input,
	InputRightElement,
} from '@chakra-ui/react';

const Profile = ({ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }) => {
	//state that decides which view the user sees in the drawer
	const [userView, setUserView] = useState({
		loginView: true,
		createUserView: false,
	});

  console.log(isLoggedIn);

	//state for showing/hiding password
	const [show, setShow] = useState(false);

	//state for signup info
	const [signup, setSignup] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	//state for login info
	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	//controls whether password text is displayed or not
	const handleClickShowPassword = () => setShow(!show);

	//links signup inputs with local state
	const handleChangeSignup = (prop) => (event) => {
		setSignup({
			...signup,
			[prop]: event.target.value,
		});
	};

	//links login inputs with local state
	const handleChangeLogin = (prop) => (event) => {
		setLogin({
			...login,
			[prop]: event.target.value,
		});
	};

	//submits signup information to backend
	const handleClickSignup = () => {
		fetch('/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
			},
			body: JSON.stringify(signup),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.message) {
					console.log(res.message);
				} else {
					setUserInfo({
						name: res.name,
						email: res.email,
					});
					setUserView({
						loginView: false,
						createUserView: false,
					});
          setIsLoggedIn(true);
				}
			})
			.catch((err) => console.log('signup err: ', err));
	};

	const handleClickLogin = () => {
		fetch('/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
			},
			body: JSON.stringify(login),
		})
			.then((res) => res.json())
			.then((res) => {
				//console.log('res in handle login: ', res);
				if (res.message) {
					console.log(res.message);
				} else {
					setUserInfo({
						name: res.name,
						email: res.email,
					});
					setUserView({
						loginView: false,
						createUserView: false,
					});
          setIsLoggedIn(true);
				}
			})
			.catch((err) => console.log('login err: ', err));
	};

	//submits login information to backend

	return (
		<Flex flexDirection='column' h='100%' w='25%'>
			<Flex marginTop={10}>
				{userView.loginView && !isLoggedIn && (
					<Box ml='3'>
						<Input
							mb='2'
							width='250'
							placeholder='Email'
							isRequired={true}
							value={login.email}
							onChange={handleChangeLogin('email')}
						/>
						<InputGroup>
							<Input
								mb='2'
								width='250'
								type={show ? 'text' : 'password'}
								placeholder='Password'
								isRequired={true}
								value={login.password}
								onChange={handleChangeLogin('password')}
							/>
							<InputRightElement mr='2' width='4.5rem'>
								<Button h='1.75rem' size='sm' onClick={handleClickShowPassword}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
						<Button mb='2' onClick={handleClickLogin}>
							Login
						</Button>
						<br />
						<Button
							onClick={(prevState) =>
								setUserView({
									...prevState,
									createUserView: true,
									loginView: false,
								})
							}
							variant='link'
							size='sm'
						>
							New user? Click to create an account.
						</Button>
					</Box>
				)}

				{userView.createUserView && !isLoggedIn && (
					<Box ml='3'>
						<Input
							mb='2'
							width='250'
							placeholder='First Name'
							isRequired={true}
							value={signup.firstName}
							onChange={handleChangeSignup('firstName')}
						/>
						<Input
							mb='2'
							width='250'
							placeholder='Last Name'
							isRequired={true}
							value={signup.lastName}
							onChange={handleChangeSignup('lastName')}
						/>
						<Input
							mb='2'
							width='250'
							placeholder='Email'
							isRequired={true}
							value={signup.email}
							onChange={handleChangeSignup('email')}
						/>
						<InputGroup>
							<Input
								mb='2'
								width='250'
								type={show ? 'text' : 'password'}
								placeholder='Password'
								isRequired={true}
								value={signup.password}
								onChange={handleChangeSignup('password')}
							/>
							<InputRightElement mr='6' width='4.5rem'>
								<Button h='1.75rem' size='sm' onClick={handleClickShowPassword}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
						<Button mb='2' onClick={handleClickSignup}>
							Create Account
						</Button>
						<Button
							onClick={(prevState) =>
								setUserView({
									...prevState,
									createUserView: false,
									loginView: true,
								})
							}
							variant='link'
							size='sm'
						>
							Already have an account? Click to login.
						</Button>
					</Box>
				)}

				{ isLoggedIn && (
					<div>
						<Box ml='3'>
							<Text fontWeight='bold'>{userInfo.name}</Text>
							<Text fontSize='sm'>{userInfo.email}</Text>
						</Box>
					</div>
				)}
			</Flex>
		</Flex>
	);
};

export default Profile;
