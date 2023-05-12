import "./style.css"
import { getCookie, setCookie, deleteCookie } from "../../functions"
import { useEffect, useState } from "react"

export const Login = (props) => {
    const [blockVisible, setBlockVisible] = useState(props.login)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [regButton, setRegButton] = useState('Регистрация')
    const [loginButton, setLoginButton] = useState('Вход')
    const [regInput, setRegInput] = useState('none')

    useEffect(() => {
        setBlockVisible(props.login)
    },[props.login])

    const Reg = () => {
        if (loginButton === 'Вход') {
            setRegButton('Зарегистрироваться')
            setLoginButton('Вернуться')
            setRegInput('flex')
        }

        else if (loginButton === 'Вернуться') {

            const user = {
                "login": {login},
                "name": {name},
                "password": {password}
            }

            fetch('https://webdev-hw-api.vercel.app/api/user', {
                method: 'POST',
                body: JSON.stringify(user)
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                }
                else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error 
                }
            })
            .then((data) => {
                console.log(data.user);
                deleteCookie('login')
                setCookie('login', data.user.login.login, {secure: true, 'max-age': 3600})
                deleteCookie('name')
                setCookie('name' , data.user.name.name, {secure: true, 'max-age': 3600})
                deleteCookie('password')
                setCookie('password' , data.user.password.password, {secure: true, 'max-age': 3600})
                setBlockVisible('none')
            })
            .catch((e) => {
                console.log(e.response);
            })
        }

    }

    const Login = () => {
        if (loginButton === 'Вернуться') {
            setRegButton('Регистрация')
            setLoginButton('Вход')
            setRegInput('none')    
        }

        else if (loginButton === 'Вход') {
            let user = {
                "login": {login},
                "password": {password}
            }
            fetch('https://webdev-hw-api.vercel.app/api/user/login', {
                method: 'POST',
                body: JSON.stringify(user)
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                }
                else {
                    let error = new Error(response.statusText)
                    error.response = response
                    throw error
                }
            })
            .then((data) => {
                console.log(data);
                deleteCookie('login')
                setCookie('login', data.user.login.login, {secure: true, 'max-age': 3600})
                deleteCookie('name')
                setCookie('name' , data.user.name.name, {secure: true, 'max-age': 3600})
                deleteCookie('password')
                setCookie('password' , data.user.password.password, {secure: true, 'max-age': 3600})
                setBlockVisible('none')
            })
            .catch((e) => {
                console.log(e.response)
            })
        }

    }

    return (
        <div style={{display: blockVisible}} className="login">
            <input placeholder="login" value={login} onChange={(e) => {setLogin(e.target.value)}} type='text'/>
            <input placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'/>
            <input placeholder="name" style={{display: regInput}} value={name} onChange={(e) => {setName(e.target.value)}} type='text'/>
            <button onClick={()=>Login()}>{loginButton}</button>
            <button onClick={()=>Reg()}>{regButton}</button>
        </div>
    )
}

export default Login