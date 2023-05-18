import './style.css'
import { useEffect, useState } from 'react'
import { loginApi, registerApi } from '../../apis'
import { FormattedMessage } from 'react-intl'

export const Login = props => {
	const [blockVisible, setBlockVisible] = useState(props.login)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [loginButton, setLoginButton] = useState(true)
	const [regInput, setRegInput] = useState(false)

	useEffect(() => {
		setBlockVisible(props.login)
	}, [props.login])

	const registration = () => {
		if (loginButton === true) {
			setLoginButton(false)
			setRegInput(true)
		} else if (loginButton === false) {
			const user = {
				login: login,
				name: name,
				password: password
			}

			registerApi(user)

			setBlockVisible(false)
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

			loginApi(user)

			setBlockVisible(false)
		}
	}

	return (
		<div style={{ display: blockVisible ? 'flex' : 'none' }} className='login'>
			<FormattedMessage id='login' defaultMessage='login'>
				{placeholder => (
					<input
						placeholder={placeholder}
						value={login}
						onChange={e => {
							setLogin(e.target.value)
						}}
						type='text'
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
					/>
				)}
			</FormattedMessage>
			<FormattedMessage
				id={loginButton ? 'enter' : 'entered'}
				defaultMessage='enter'
			>
				{placeholder => <button onClick={() => enter()}>{placeholder}</button>}
			</FormattedMessage>
			<FormattedMessage
				id={loginButton ? 'registration' : 'register'}
				defaultMessage='register'
			>
				{placeholder => (
					<button onClick={() => registration()}>{placeholder}</button>
				)}
			</FormattedMessage>
		</div>
	)
}

export default Login
