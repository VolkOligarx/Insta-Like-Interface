import { useState } from 'react'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { sendPic, sendPost } from '../../apis'
import { LOCALES } from '../../i18n/locales'
import { messages } from '../../i18n/messages'
import Login from '../login/login'
import Modal from '../modal/modal'
import UserBlock from '../userBlock/userBlock'
import './style.css'

export const Header = () => {
	const [loginVisible, setLoginVisible] = useState(false)
	const [language, setLanguage] = useState(LOCALES.RUSSIAN)
	const [modalActive, setModalActive] = useState(false)
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const locale = language

	const uploadContent = event => {
		event.preventDefault()
		event.target.files[0] ? setImage(event.target.files[0]) : alert('Вставьте изображение')
	}

	const sendImage = event => {
		event.preventDefault()
		const formData = new FormData()
		formData.append('file', image)
		setModalActive(false)

		sendPic(formData)
			.then(data => {
				const postInput = {
					description: description,
					imageUrl: data.fileUrl
				}
				sendPost(postInput)
			})
			.catch(e => {
				console.log(e)
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
												language === LOCALES.RUSSIAN
													? setLanguage(LOCALES.ENGLISH)
													: setLanguage(LOCALES.RUSSIAN)
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
					<div>
						<h1>Instapro</h1>
						<FormattedMessage id='createPost' defaultMessage='createPost'>
							{placeholder => (
								<button className='post-button'
									onClick={() => {
										setModalActive(true)
									}}
								>
									{placeholder}
								</button>
							)}
						</FormattedMessage>
					</div>
					<div className='button-block'>
						<button
							onClick={() => {
								loginVisible === false
									? setLoginVisible(true)
									: setLoginVisible(false)
							}}
							className='button-enter'
						>
							<FormattedMessage id='enterButton' />
						</button>
					</div>
				</div>
				<Login login={loginVisible}></Login>
				<UserBlock language={language}></UserBlock>
				<Modal active={modalActive} setActive={setModalActive}>
					<input
						onChange={e => {
							uploadContent(e)
						}}
						type='file'
					/>
					<input
						value={description}
						onChange={e => {
							setDescription(e.target.value)
						}}
						type='text'
					/>
					<FormattedMessage id='createPost' defaultMessage='createPost'>
						{placeholder => (
							<button
								onClick={e => {
									sendImage(e)
								}}
							>
								{placeholder}
							</button>
						)}
					</FormattedMessage>
				</Modal>
			</div>
		</IntlProvider>
	)
}

export default Header
