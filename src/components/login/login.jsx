import './style.css'
import { useState } from 'react'
import { loginApi, registerApi } from '../../apis'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { messages } from '../../i18n/messages'
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [loginButton, setLoginButton] = useState(true)
	const [regInput, setRegInput] = useState(false)
	const navigate = useNavigate()
	const language = localStorage.getItem('language')
	const locale = language

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
			navigate('/Insta-Like-Interface/')
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
			navigate('/Insta-Like-Interface/')
		}
	}

	return (
		<IntlProvider
			messages={messages[locale]}
			locale={locale}
			defaultLocale={language}
		>
			<div className='login'>
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
					{placeholder => (
						<button onClick={() => enter()}>{placeholder}</button>
					)}
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
			</div>
		</IntlProvider>
	)
}

export default Login
