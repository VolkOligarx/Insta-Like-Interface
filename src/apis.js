import { userInfo } from "./functions"

const userData = userInfo()

export const loginApi = (user) => {
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
        localStorage.clear()

        localStorage.setItem('login', data.user.login)
        localStorage.setItem('name', data.user.name)
        localStorage.setItem('password', data.user.password)
        localStorage.setItem('token', data.user.token)
        localStorage.setItem('_id', data.user._id)

        alert('Успешно')
    })
    .catch((e) => {
        console.log(e)
        alert('Пользователь не найден')
    })
}


export const registerApi = (user) => {
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
        localStorage.clear()

        localStorage.setItem('login', data.user.login)
        localStorage.setItem('name', data.user.name)
        localStorage.setItem('password', data.user.password)
        localStorage.setItem('token', data.user.token)
        localStorage.setItem('_id', data.user._id)

        alert('Успешно')
    })
    .catch((e) => {
        console.log(e)
        alert('Пользователь уже создан или введеные данные не корректны')
    })
}

export const dislike = (id) => {
    fetch(`https://webdev-hw-api.vercel.app/api/v1/volk/instapro/${id}/dislike`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
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
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    })                    
}

export const like = (id) => {
        fetch(`https://webdev-hw-api.vercel.app/api/v1/volk/instapro/${id}/like`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
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
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        })                    
}

export const fetchPosts = () => {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro')
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
}