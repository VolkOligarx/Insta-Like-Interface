import './App.css'
import { AppRoutes } from './AppRotes'
import { IntlProvider } from 'react-intl'
import { messages } from './i18n/messages'
import { LOCALES } from './i18n/locales'
import { useEffect, useState } from 'react'




function App() {
	localStorage.setItem('language', LOCALES.RUSSIAN)
	const [language, setLanguage] = useState(LOCALES.RUSSIAN)
	useEffect(() => {
		setLanguage(localStorage.getItem('language'))
		console.log(1)
	},[])
	const locale = language

	return (
		<IntlProvider
			messages={messages[locale]}
			locale={locale}
			defaultLocale={language}
		>
			<div className='App'>
				<AppRoutes />
			</div>
		</IntlProvider>
	)
}

export default App
