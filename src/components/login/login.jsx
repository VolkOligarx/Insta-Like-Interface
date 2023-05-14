import "./style.css"
import { setCookie, deleteCookie } from "../../functions"
import { useEffect, useState } from "react"
import { loginApi, registerApi } from "../../api's"

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
                "login": login,
                "name": name,
                "password": password
            }

            fetch(registerApi, {
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
                setCookie('login', data.user.login, {secure: true, 'max-age': 3600})
                deleteCookie('name')
                setCookie('name' , data.user.name, {secure: true, 'max-age': 3600})
                deleteCookie('password')
                setCookie('password' , data.user.password, {secure: true, 'max-age': 3600})
                deleteCookie('token')
                setCookie('token' , data.user.token, {secure: true, 'max-age': 3600})
                setBlockVisible('none')
                deleteCookie('_id')
                setCookie('_id' , data.user._id, {secure: true, 'max-age': 3600})
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
                "login": login,
                "password": password
            }
            fetch(loginApi, {
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
                setCookie('login', data.user.login, {secure: true, 'max-age': 3600})
                deleteCookie('name')
                setCookie('name' , data.user.name, {secure: true, 'max-age': 3600})
                deleteCookie('password')
                setCookie('password' , data.user.password, {secure: true, 'max-age': 3600})
                setBlockVisible('none')
                deleteCookie('token')
                setCookie('token' , data.user.token, {secure: true, 'max-age': 3600})
                deleteCookie('_id')
                setCookie('_id' , data.user._id, {secure: true, 'max-age': 3600})
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