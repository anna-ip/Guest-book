import React, { useEffect, useState } from 'react'
import '../lib/Messages.css'
import moment from 'moment'

const url = 'http://localhost:6060/messages'
const thoughtsUrl = 'http://localhost:6060/messages'


//bring the name from the register form
export const Messages = props => {
	const [alert, setAlert] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const [message, setMessage] = useState('') /** For the Form part**/
	const [thoughts, setThoughts] = useState([])  /** For the handleSubmit .then **/
	const [guestText, setGuestText] = useState([]) /** list with happy thougts ***/
	const [likes, setLikes] = useState()

	//Getting the accessToken from the browser's localStorage
	//and sending it as the header 'Authorization'
	const accessToken = window.localStorage.getItem('accessToken');



	useEffect(() => {
		setErrorMessage('');
		fetch(url, {
			method: 'GET',
			headers: { Authorization: accessToken }
		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Access denied', JSON);
				} else {
					return res.json();
				}
			})
			.then(json => setAlert(json.message))
			.catch(err => {
				setErrorMessage(err.message);
			});
	}, [accessToken])

	// useEffect(() => {
	// 	fetch(thoughtsUrl)
	// 		.then(res => res.json())
	// 		.then(json => setGuestText(json));
	// }, [message, guestText]) //dependencies for when the fecth should update

	// **** Submit and post a thought ******
	const handleFormSubmit = (event) => {
		event.preventDefault()
		fetch(thoughtsUrl, {
			method: 'POST',
			body: JSON.stringify({ message }),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((newThought) => {
				setThoughts((previousThoughts) => [newThought, ...previousThoughts])
				console.log('newThought', newThought)
			})
			.then(() => setMessage(""))
	}

	//  **** Heart button fetch *****
	// const handleLikeSubmit = (id) => {
	// 	fetch(`${thoughtsUrl}/${id}/like`, {
	// 		method: 'POST',
	// 	})
	// 		.then((res) => res.json())
	// 		.then(json => console.log(json))
	// 		.then(setLikes(likes + 1))
	// 		.catch(err => console.log('error', err))
	// }

	return (
		<>
			<div className="msg-container">
				<h1>Welcome!</h1>
				<h5>{alert}</h5>

				{/**** Form for sending Happy thoughts  *****/}
				<div className="form-box">

					<form onSubmit={(event) => event.preventDefault()}>

						<section>
							<label htmlFor="new-message">Leave a note for the hosts</label>
							<textarea
								id="new-message"
								rows="3"
								minLength="5"
								maxLength="150"
								onChange={(event) => setMessage(event.target.value)}
								value={message}
								required>
							</textarea>
						</section>

						{/*** Form submit button ***/}
						<div className='form-btn-container'>
							<button className="form-btn"
								onClick={handleFormSubmit}
								type="submit">
								Send Your Thoughts
							</button >
						</div>

					</form>
				</div>


				{/****  List with meassages of Happy thoughts  *****/}
				<div>
					<ul>
						{guestText.map(text => (
							<li key={text._id} className="message-list">
								<div className="message"> {text.message} </div>
								<section className="bottom-line">
									<div className="like-div">
										{/***  Heart/like button ***/}
										<button className="like-btn"
										//onClick={() => handleLikeSubmit(text._id)}
										>
											<span role="img" aria-label="like">👍🏻</span>
										</button>
										<span className="likes-clicked"> x
									{text.like}
										</span>
									</div>
									<div className="time">
										{moment(text.createdAt).fromNow()}
									</div>
								</section>
							</li >
						)
						)}
					</ul>
				</div >
				{/* </div > */}
				<div className='log-out-btn-container'>
					<button
						id='logout'
						className='log-out-btn'
						onClick={() => (window.location.href = '/SignIn')}
						type='button'
					>
						logout
        </button>
				</div>

			</div>
			{errorMessage && <div>{errorMessage}</div>}
		</>
	)
}



