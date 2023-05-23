import { useState } from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { sendPic, sendPost } from '../../apis'
import { useNavigate } from "react-router-dom";
import { LOCALES } from '../../i18n/locales'
import Modal from '../modal/modal'
import UserBlock from '../userBlock/userBlock'
import './style.css'
import { messages } from '../../i18n/messages';

export const Main = () => {
	const [language, setLanguage] = useState(LOCALES.RUSSIAN)
	const [modalActive, setModalActive] = useState(false)
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const navigate = useNavigate()
	const locale = language


	const lngSwitch = () => {
		if (language === LOCALES.RUSSIAN) {
			setLanguage(LOCALES.ENGLISH)
			localStorage.setItem('language', LOCALES.ENGLISH)
		}
		else {
			setLanguage(LOCALES.RUSSIAN)
			localStorage.setItem('language', LOCALES.RUSSIAN)
		}
	}

	const uploadContent = event => {
		event.target.files[0] ? setImage(event.target.files[0]) : alert('Вставьте изображение')
	}

	const sendImage = event => {
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
							className='button-enter' onClick={() => {navigate('/Insta-Like-Interface/login')}}
						>
							<FormattedMessage id='enterButton' />
						</button>
					</div>
				</div>
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

export default Main
