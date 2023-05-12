import { useState } from "react"
import Login from "../login/login"
import UserBlock from "../userBlock/userBlock"
import "./style.css"

export const Header = () => {
    const [loginVisible, setLoginVisible] = useState('none')

    return (
        <div>
            <div className="header">
                <div className="buttonBlock">
                    <button text='Русский' hover-text='Switch to English' className="buttonLng"></button>
                </div>
                <h1>Instapro</h1>
                <div className="buttonBlock">
                    <button onClick={() => {loginVisible === 'none' ? setLoginVisible('flex') : setLoginVisible('none')}} className="buttonEnter">Enter</button>
                </div>
            </div>
            <Login login={loginVisible}></Login>
            <UserBlock></UserBlock>
        </div>
    )
}

export default Header