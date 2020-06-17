import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import '../lib/SignIn.css'


const url = 'http://localhost:6060/signIn'


export const SignIn = () => {
	const history = useHistory();
	// hover function turn on and off
	const inputRef = useRef();

	// for validation useForm
	const { errors, register, handleSubmit } = useForm();
	const onSubmit = values => {
		console.log(values);
	};

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handelSignInSubmit = () => {
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		})
			// First one runs
			.then(res => {
				if (!res.ok) {
					throw new Error('Your e-mail and/or password was incorrect');
				}
				history.push('/Messages');
				return res.json();
			})

			.then(
				// if 200 message
				({ accessToken }) => {
					window.localStorage.setItem('accessToken', accessToken);
					console.log({ accessToken });
				},
				[email, password]
			)
			.catch(err => {
				// if 400 message
				alert(err.message);
			});
	};

	return (
		<>
			<h1>Sign in:</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* email */}
				<span className='input-container'>
					<input
						name='email'
						ref={
							(inputRef,
								register({
									required: 'Required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'invalid email address'
									}
								}))
						}
						placeholder='Email@mail.com'
						onMouseEnter={() => {
							inputRef.current.focus();
						}}
						type='email'
						onChange={event => setEmail(event.target.value)}
					/>
					{errors.email && errors.email.message}
					{/* </span> */}

					{/* password */}
					{/* <span className='input'> */}
					<input
						ref={inputRef}
						placeholder='Password'
						onMouseEnter={() => {
							inputRef.current.focus();
						}}
						type='password'
						onChange={event => setPassword(event.target.value)}
						value={password}
						required
					/>
				</span>
				<div className='btn-container'>
					<button onClick={() => (window.location.href = '/')} type='button'>
						Register
          </button>

					<button
						id='signIn'
						className='btn'
						onClick={() => handelSignInSubmit()}
						type='submit'
					>
						Sign In
          </button>
					{/* </Link> */}
				</div>
			</form>
		</>
	);
};
