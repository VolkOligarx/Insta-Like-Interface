import './style.css'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { userInit } from '../../functions'
import { sendPic } from '../../apis'

export const Login = ({ setActive, setCreatePost, setUnlogin }) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [loginButton, setLoginButton] = useState(true)
	const [regInput, setRegInput] = useState(false)
	const [wrong, setWrong] = useState('')
	const [image, setImage] = useState('')
	const [sendImage, setSendImage] = useState('')
	const navigate = useNavigate()

	const uploadContent = event => {
		setImage(event.target.files[0])
	}

	const postImage = () => {
		const formData = new FormData()
		formData.append('file', image)

		sendPic(formData)
			.then(data => {
				setSendImage(data.fileUrl)
				const user = {
					login: login,
					name: name,
					password: password,
					imageUrl: sendImage
				}
				loginApi(user, '')
			})
			.catch(error => {
				console.log(error)
			})
	}

	const loginApi = (user, loginRegister) => {
		fetch(`https://webdev-hw-api.vercel.app/api/user${loginRegister}`, {
			method: 'POST',
			body: JSON.stringify(user)
		})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json()
				} else {
					let error = new Error(response.statusText)
					error.response = response
					throw error
				}
			})
			.then(data => {
				userInit(
					data.user.login,
					data.user.name,
					data.user.password,
					data.user.token,
					data.user._id
				)
				setActive(false)
				setCreatePost(true)
				setUnlogin(true)
				window.location.reload()
			})
			.catch(error => {
				console.error(error)
				setWrong('Пользователь уже создан или введеные данные не корректны')
				setTimeout(() => {
					setWrong('')
				}, 5000)
			})
	}

	const registration = () => {
		if (loginButton === true) {
			setLoginButton(false)
			setRegInput(true)
		} else if (loginButton === false) {
			if (image) {
				postImage()
			} else {
				const user = {
					login: login,
					name: name,
					password: password
				}
				loginApi(user, '')
			}
		}
	}

	const enter = () => {
		if (loginButton === false) {
			setLoginButton(true)
			setRegInput(false)
		} else if (loginButton === true) {
			let user = {
				login: login,
				password: password
			}
			loginApi(user, '/login')
		}
	}

	return (
		<div className='login'>
			<h1
				onClick={() => {
					navigate('/Insta-Like-Interface/')
				}}
				className='login-h1'
			>
				Ｉｎｓｔａｐｒｏ
			</h1>

			<p className='login-error'>{wrong}</p>

			<div className='login-block'>
				<FormattedMessage id='login' defaultMessage='login'>
					{placeholder => (
						<input
							placeholder={placeholder}
							value={login}
							onChange={e => {
								setLogin(e.target.value)
							}}
							type='text'
							className='login-input'
						/>
					)}
				</FormattedMessage>

				<FormattedMessage id='password' defaultMessage='password'>
					{placeholder => (
						<input
							placeholder={placeholder}
							value={password}
							onChange={e => {
								setPassword(e.target.value)
							}}
							type='password'
							className='login-input'
						/>
					)}
				</FormattedMessage>
				<FormattedMessage id='name' defaultMessage='name'>
					{placeholder => (
						<input
							placeholder={placeholder}
							style={{ display: regInput ? 'flex' : 'none' }}
							value={name}
							onChange={e => {
								setName(e.target.value)
							}}
							type='text'
							className='login-input'
						/>
					)}
				</FormattedMessage>
				<div style={{ display: regInput ? 'flex' : 'none' }}>
					<input
						name='file'
						type='file'
						id='modal-file-3'
						className='login-modal-file'
						onChange={event => {
							uploadContent(event)
						}}
						multiple
					></input>
					<label className='login-modal-file-wrapper' htmlFor='modal-file-3'>
						<FormattedMessage
							id={image ? 'choosenFile' : 'chooseFile'}
							defaultMessage='createPost'
						>
							{placeholder => (
								<div className='login-modal-file-fake'>{placeholder}</div>
							)}
						</FormattedMessage>

						<FormattedMessage id='choose' defaultMessage='createPost'>
							{placeholder => (
								<div className='login-modal-file-button'>{placeholder}</div>
							)}
						</FormattedMessage>
					</label>
				</div>

				<FormattedMessage
					id={loginButton ? 'enter' : 'entered'}
					defaultMessage='enter'
				>
					{placeholder => (
						<button
							style={{ marginTop: '20px' }}
							className='login-button'
							onClick={() => enter()}
						>
							<span>{placeholder}</span>
						</button>
					)}
				</FormattedMessage>
				<FormattedMessage
					id={loginButton ? 'registration' : 'register'}
					defaultMessage='register'
				>
					{placeholder => (
						<button className='login-button' onClick={() => registration()}>
							<span>{placeholder}</span>
						</button>
					)}
				</FormattedMessage>
			</div>
		</div>
	)
}

export default Login
