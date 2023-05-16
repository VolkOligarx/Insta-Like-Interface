import { useState } from 'react'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { LOCALES } from '../../i18n/locales'
import { messages } from '../../i18n/messages'
import Login from '../login/login'
import UserBlock from '../userBlock/userBlock'
import './style.css'

export const Header = () => {
	const [loginVisible, setLoginVisible] = useState(false)
	const [language, setLanguage] = useState(LOCALES.RUSSIAN)
	const locale = language

	return (
		<IntlProvider
			messages={messages[locale]}
			locale={locale}
			defaultLocale={language}
		>
			<div>
				<div className='header'>
					<div className='button-block'>
						<button
							onClick={() => {
								language === LOCALES.RUSSIAN ? setLanguage(LOCALES.ENGLISH) : setLanguage(LOCALES.RUSSIAN)
							}}
							text={language === LOCALES.RUSSIAN ? 'Русский' : 'English'}
							hover-text={
								language === LOCALES.RUSSIAN
									? 'Switch to English'
									: 'Переключить на Русский'
							}
							className='button-lng'
						></button>
					</div>
					<h1>Instapro</h1>
					<div className='button-block'>
						<button
							onClick={() => {
								loginVisible === false
									? setLoginVisible(true)
									: setLoginVisible(false)
							}}
							className='button-enter'
						>
							<FormattedMessage id='enterButton'/>
						</button>
					</div>
				</div>
				<Login language={language} login={loginVisible}></Login>
				<UserBlock language={language}></UserBlock>
			</div>
		</IntlProvider>
	)
}

export default Header
