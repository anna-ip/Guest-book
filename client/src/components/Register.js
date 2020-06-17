import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../lib/Register.css'

import { useHistory } from 'react-router'

const url = 'http://localhost:6060/'


export const Register = () => {
	// hover function turn on and off
	const inputRef = useRef()
	const [name, setName] = useState(' ')
	const [email, setEmail] = useState(' ')
	const [password, setPassword] = useState(' ')
	//const history = useHistory()

	const handelRegisterSubmit = () => {
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => res.json())
			.then(json => {
				setName('');
				setEmail('');
				setPassword('');
				console.log(json);
			});
	};

	return (
		<>
			<h1>Register:</h1>
			<form
				className='form-container'
				onSubmit={event => event.preventDefault()}>

				{/* name */}
				<span>
					<input
						className='input-name'
						placeholder='Name'
						ref={inputRef}
						onMouseEnter={() => {
							inputRef.current.focus();
						}}
						type='text'
						onChange={event => setName(event.target.value)}
						value={name}
						required
					/>
				</span>
				<div className='input-conatiner'>
					{/* email */}
					<span>
						<input
							className='email'
							placeholder='Email@mail.com'
							ref={inputRef}
							onMouseEnter={() => {
								inputRef.current.focus();
							}}
							type='email'
							onChange={event => setEmail(event.target.value)}
							value={email}
							required
						/>
					</span>

					{/* password */}
					<span>
						<input
							className='password'
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
				</div>
			</form>
			<div className='btn-container'>
				<Link to={`/SignIn`}>
					<button type='button'>Sign In</button>
				</Link>
				<Link className='link' to={`/Messages`}>
					<button onClick={handelRegisterSubmit} type='submit'>
						Register
          </button>
				</Link>

			</div>
		</>
	)
}