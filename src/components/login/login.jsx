import "./style.css"
import { useEffect, useState } from "react"
import { loginApi, registerApi } from "../../apis"

export const Login = (props) => {
    const [blockVisible, setBlockVisible] = useState(props.login)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [regButton, setRegButton] = useState(true)
    const [loginButton, setLoginButton] = useState(true)
    const [regInput, setRegInput] = useState(false)

    useEffect(() => {
        setBlockVisible(props.login)
    },[props.login])

    const reg = () => {
        if (loginButton === true) {
            setRegButton(false)
            setLoginButton(false)
            setRegInput(true)
        }

        else if (loginButton === false) {

            const user = {
                "login": login,
                "name": name,
                "password": password
            }

            registerApi(user)

            setBlockVisible(false)
        }
    }

    const log = () => {
        if (loginButton === false) {
            setRegButton(true)
            setLoginButton(true)
            setRegInput(false)    
        }

        else if (loginButton === true) {
            let user = {
                "login": login,
                "password": password
            }

            loginApi(user)

            setBlockVisible(false)
        }
    }

    return (
        <div style={{display: blockVisible ? 'flex' : 'none'}} className="login">
            <input placeholder={props.language ? 'Логин' : 'Login'} value={login} onChange={(e) => {setLogin(e.target.value)}} type='text'/>
            <input placeholder={props.language ? 'Пароль' : 'Password'} value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'/>
            <input placeholder={props.language ? 'Имя' : 'Name'} style={{display: regInput ? 'flex' : 'none'}} value={name} onChange={(e) => {setName(e.target.value)}} type='text'/>
            <button onClick={()=>log()}>{props.language ? (loginButton ? 'Войти' : 'Вернуться') : (loginButton ? 'Enter' : 'Go back')}</button>
            <button onClick={()=>reg()}>{props.language ? (regButton ? 'Регистрация' : 'Зарегистрироваться') : (regButton ? 'Registration' : 'Register')}</button>
        </div>
    )
}

export default Login