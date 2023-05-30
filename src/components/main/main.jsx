import { useEffect, useState } from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { sendPic, sendPost } from '../../apis'
import { useNavigate } from 'react-router-dom'
import { LOCALES } from '../../i18n/locales'
import Modal from '../modal/modal'
import './style.css'
import { messages } from '../../i18n/messages'
import UserBlock from '../userBlock/userBlock'

export const Main = () => {
	const [language, setLanguage] = useState(LOCALES.RUSSIAN)
	const [modalActive, setModalActive] = useState(false)
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [filePlaceholder, setFilePlaceholder] = useState('Файл не выбран')
	const [reload, setReload] = useState(true)
	const navigate = useNavigate()
	const locale = language

	useEffect(() => {
		if (language === LOCALES.RUSSIAN) {
			image
				? setFilePlaceholder('Выбран 1 файл')
				: setFilePlaceholder('Файл не выбран')
		} else {
			image
				? setFilePlaceholder('1 chosen file')
				: setFilePlaceholder('No chosen files')
		}
	}, [image, language])

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
		event.target.files[0]
			? setImage(event.target.files[0])
			: alert('Вставьте изображение')
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
				setTimeout(() => {
					reload ? setReload(false) : setReload(true)
				}, 3000);
			})
			.catch(e => {
				console.log(e)
				alert('Неправильно выбрана картинка или не выбрана вовсе')
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
								reload ? setReload(false) : setReload(true)
							}}
							className='header-h1'
						>
							Ｉｎｓｔａｐｒｏ
						</h1>
						<FormattedMessage id='createPost' defaultMessage='createPost'>
							{placeholder => (
								<button
									className='post-button'
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
							className='button-enter'
							onClick={() => {
								navigate('/Insta-Like-Interface/login')
							}}
						>
							<FormattedMessage id='enterButton' />
						</button>
					</div>
				</div>
				<Modal active={modalActive} setActive={setModalActive}>
					<div className='modal-wrapper'>
						<input
							name='file'
							type='file'
							id='modal-file-2'
							className='modal-file'
							onChange={e => {
								uploadContent(e)
							}}
							multiple
						/>

						<label className='modal-file-wrapper' htmlFor='modal-file-2'>
							<div className='modal-file-fake'>{filePlaceholder}</div>
							<FormattedMessage id='choose' defaultMessage='createPost'>
								{placeholder => (
									<div className='modal-file-button'>{placeholder}</div>
								)}
							</FormattedMessage>
						</label>
					</div>
					<div className='modal-block'>
						<FormattedMessage id='postDescription' defaultMessage='createPost'>
							{placeholder => (
								<input
									value={description}
									onChange={e => {
										setDescription(e.target.value)
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
									onClick={e => {
										sendImage(e)
									}}
								>
									{placeholder}
								</button>
							)}
						</FormattedMessage>
					</div>
				</Modal>
			</div>
			<UserBlock reload={reload}></UserBlock>
		</IntlProvider>
	)
}

export default Main
