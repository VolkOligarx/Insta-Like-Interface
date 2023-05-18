import './style.css'
import { useEffect, useState } from 'react'
import { loginApi, registerApi } from '../../apis'
import { LOCALES } from '../../i18n/locales'

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
			<input
				placeholder={props.language === LOCALES.RUSSIAN ? 'Логин' : 'Login'}
				value={login}
				onChange={e => {
					setLogin(e.target.value)
				}}
				type='text'
			/>
			<input
				placeholder={props.language === LOCALES.RUSSIAN ? 'Пароль' : 'Password'}
				value={password}
				onChange={e => {
					setPassword(e.target.value)
				}}
				type='password'
			/>
			<input
				placeholder={props.language === LOCALES.RUSSIAN ? 'Имя' : 'Name'}
				style={{ display: regInput ? 'flex' : 'none' }}
				value={name}
				onChange={e => {
					setName(e.target.value)
				}}
				type='text'
			/>
			<button onClick={() => enter()}>
				{props.language === LOCALES.RUSSIAN
					? loginButton
						? 'Войти'
						: 'Вернуться'
					: loginButton
					? 'Enter'
					: 'Go back'}
			</button>
			<button onClick={() => registration()}>
				{props.language === LOCALES.RUSSIAN
					? loginButton
						? 'Регистрация'
						: 'Зарегистрироваться'
					: loginButton
					? 'Registration'
					: 'Register'}
			</button>
		</div>
	)
}

export default Login
