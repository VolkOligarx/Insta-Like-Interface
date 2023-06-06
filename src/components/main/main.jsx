import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { sendPic, sendPost } from '../../apis'
import { LOCALES } from '../../i18n/locales'
import Modal from '../modal/modal'
import './style.css'
import { messages } from '../../i18n/messages'
import UserBlock from '../userBlock/userBlock'
import { userInfo } from '../../functions'
import Login from '../login/login'

export const Main = () => {
	const [language, setLanguage] = useState(LOCALES.RUSSIAN)
	const [modalActivePost, setModalActivePost] = useState(false)
	const [modalActiveLogin, setModalActiveLogin] = useState(false)
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [buttonAnimation, setButtonAnimation] = useState(false)
	const [inputAnimation, setInputAnimation] = useState(false)
	const [sendAnimation, setSendAnimation] = useState(false)
	const [createPost, setCreatePost] = useState(false)
	const [unlogin, setUnlogin] = useState(false)
	const [user, setUser] = useState(userInfo())
	const [reload, setReload] = useState(true)
	const navigate = useNavigate()
	const locale = language

	useEffect(() => {
		user.token ? setCreatePost(true) : setCreatePost(false)
		user.token ? setUnlogin(true) : setUnlogin(false)
	}, [image, user.token])

	const lngSwitch = () => {
		if (language === LOCALES.RUSSIAN) {
			setLanguage(LOCALES.ENGLISH)
			localStorage.setItem('language', LOCALES.ENGLISH)
		} else {
			setLanguage(LOCALES.RUSSIAN)
			localStorage.setItem('language', LOCALES.RUSSIAN)
		}
	}

	const uploadContent = event => {
		if (event.target.files[0]) {
			setImage(event.target.files[0])
		} else {
			setSendAnimation(true)
			return setTimeout(() => {
				setSendAnimation(false)
			}, 3000)
		}
	}

	const sendImage = () => {
		const formData = new FormData()
		formData.append('file', image)

		sendPic(formData)
			.then(data => {
				const postInput = {
					description: description,
					imageUrl: data.fileUrl
				}
				if (description) {
					sendPost(postInput)
					setTimeout(() => {
						reload ? setReload(false) : setReload(true)
						navigate('/')
						navigate('/Insta-Like-Interface/')
					}, 3000)
					setModalActivePost(false)
				} else {
					setInputAnimation(true)
					setTimeout(() => {
						setInputAnimation(false)
					}, 3000)
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<IntlProvider
			messages={messages[locale]}
			locale={locale}
			defaultLocale={language}
		>
			<div>
				<div className='header'>
					<div className='button-block'>
						<FormattedMessage id='lngSwitch' defaultMessage='lngSwitch'>
							{placeholderText => (
								<FormattedMessage
									id='lngHoverSwitch'
									defaultMessage='lngHoverSwitch'
								>
									{placeholderHover => (
										<button
											onClick={() => {
												lngSwitch()
											}}
											text={placeholderText}
											hover-text={placeholderHover}
											className='button-lng'
										></button>
									)}
								</FormattedMessage>
							)}
						</FormattedMessage>
					</div>
					<div className='header-block'>
						<h1
							onClick={() => {
								localStorage.removeItem('posts')
								reload ? setReload(false) : setReload(true)
								navigate('/')
								navigate('/Insta-Like-Interface/')
							}}
							className='header-h1'
						>
							Ｉｎｓｔａｐｒｏ
						</h1>
						<FormattedMessage id='createPost' defaultMessage='createPost'>
							{placeholder => (
								<button
									style={{ display: createPost ? 'flex' : 'none' }}
									className='post-button'
									onClick={() => {
										setModalActivePost(true)
									}}
								>
									{placeholder}
								</button>
							)}
						</FormattedMessage>
					</div>
					<div className='button-block'>
						<button
							style={{
								animation: buttonAnimation
									? 'heartbeat 1s ease-in-out 3 both'
									: 'none'
							}}
							className='button-enter'
							onClick={() => {
								if (user.token) {
									localStorage.clear()
									setCreatePost(false)
									setUnlogin(false)
									setUser(userInfo())
									window.location.reload()
								} else {
									setModalActiveLogin(true)
								}
							}}
						>
							<FormattedMessage
								id={unlogin ? 'exitButton' : 'enterButton'}
								defaultMessage='enterButton'
							/>
						</button>
					</div>
				</div>
				<Modal active={modalActivePost} setActive={setModalActivePost}>
					<div className='modal-wrapper'>
						<input
							style={{
								animation: sendAnimation
									? 'heartbeat 1.5s ease-in-out 2 both'
									: 'none'
							}}
							name='file'
							type='file'
							id='modal-file-2'
							className='modal-file'
							onChange={event => {
								uploadContent(event)
							}}
							multiple
						/>

						<label className='modal-file-wrapper' htmlFor='modal-file-2'>
						<FormattedMessage id={image ? 'choosenFile' : 'chooseFile'} defaultMessage='createPost'>
						{placeholder => <div className='modal-file-fake'>{placeholder}</div>}
					</FormattedMessage>
							<FormattedMessage id='choose' defaultMessage='createPost'>
								{placeholder => (
									<div className='modal-file-button'>{placeholder}</div>
								)}
							</FormattedMessage>
						</label>
					</div>
					<div
						style={{
							animation: inputAnimation
								? 'heartbeat 1.5s ease-in-out 2 both'
								: 'none'
						}}
						className='modal-block'
					>
						<FormattedMessage id='postDescription' defaultMessage='createPost'>
							{placeholder => (
								<input
									value={description}
									onChange={event => {
										setDescription(event.target.value)
									}}
									type='text'
									placeholder={placeholder}
									maxLength='100'
									className='modal-description'
								/>
							)}
						</FormattedMessage>

						<FormattedMessage id='createPost' defaultMessage='createPost'>
							{placeholder => (
								<button
									className='modal-button'
									onClick={event => {
										sendImage(event)
									}}
								>
									{placeholder}
								</button>
							)}
						</FormattedMessage>
					</div>
				</Modal>
				<Modal active={modalActiveLogin} setActive={setModalActiveLogin}>
					<div className='modal-wrapper'>
						<Login
							setCreatePost={setCreatePost}
							setActive={setModalActiveLogin}
							setUnlogin={setUnlogin}
						></Login>
					</div>
				</Modal>
			</div>
			<UserBlock
				setButtonAnimation={setButtonAnimation}
				reload={reload}
				language={language === LOCALES.RUSSIAN ? true : false}
			></UserBlock>
		</IntlProvider>
	)
}

export default Main
