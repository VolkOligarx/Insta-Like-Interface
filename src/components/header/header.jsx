import { useState } from "react"
import Login from "../login/login"
import UserBlock from "../userBlock/userBlock"
import "./style.css"

export const Header = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [language, setLanguage] = useState(true)

    return (
        <div>
            <div className="header">
                <div className="button-block">
                    <button onClick={() => {language ? setLanguage(false) : setLanguage(true)}} text={language ? 'Русский' : 'English'} hover-text={language ? 'Switch to English' : 'Переключить на Русский'} className="button-lng"></button>
                </div>
                <h1>Instapro</h1>
                <div className="button-block">
                    <button onClick={() => {loginVisible === false ? setLoginVisible(true) : setLoginVisible(false)}} className="button-enter">{language ? 'Войти' : 'Enter'}</button>
                </div>
            </div>
            <Login language={language} login={loginVisible}></Login>
            <UserBlock language={language}></UserBlock>
        </div>
    )
}

export default Header