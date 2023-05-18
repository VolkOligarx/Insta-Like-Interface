import { userInfo, userInit } from './functions'

const userData = userInfo()

export const loginApi = user => {
	fetch('https://webdev-hw-api.vercel.app/api/user/login', {
		method: 'POST',
		body: JSON.stringify(user)
	})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.json()
			} else {
				let error = new Error(response.statusText)
				error.response = response
				throw error
			}
		})
		.then(data => {
			userInit(
				data.user.login,
				data.user.name,
				data.user.password,
				data.user.token,
				data.user._id
			)

			alert('Успешно')
		})
		.catch(e => {
			console.log(e)
			alert('Пользователь не найден')
		})
}

export const registerApi = user => {
	fetch('https://webdev-hw-api.vercel.app/api/user', {
		method: 'POST',
		body: JSON.stringify(user)
	})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.json()
			} else {
				let error = new Error(response.statusText)
				error.response = response
				throw error
			}
		})
		.then(data => {
			userInit(
				data.user.login,
				data.user.name,
				data.user.password,
				data.user.token,
				data.user._id
			)

			alert('Успешно')
		})
		.catch(e => {
			console.log(e)
			alert('Пользователь уже создан или введеные данные не корректны')
		})
}

export const dislike = id => {
	fetch(`https://webdev-hw-api.vercel.app/api/v1/volk/instapro/${id}/dislike`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${userData.token}`
		}
	})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.json()
			} else {
				let error = new Error(response.statusText)
				error.response = response
				throw error
			}
		})
		.then(data => {
			console.log(data)
		})
		.catch(e => {
			console.log(e)
		})
}

export const like = id => {
	fetch(`https://webdev-hw-api.vercel.app/api/v1/volk/instapro/${id}/like`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${userData.token}`
		}
	})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.json()
			} else {
				let error = new Error(response.statusText)
				error.response = response
				throw error
			}
		})
		.then(data => {
			console.log(data)
		})
		.catch(e => {
			console.log(e)
		})
}

export const fetchPosts = () => {
	return fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro').then(
		response => {
			if (response.status >= 200 && response.status < 300) {
				return response.json()
			} else {
				let error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}
	)
}

export const sendPic = formData => {
	return fetch('https://webdev-hw-api.vercel.app/api/upload/image', {
		method: 'POST',
		body: formData
	}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.json()
		} else {
			let error = new Error(response.statusText)
			error.response = response
			throw error
		}
	})
}

export const sendPost = data => {
	fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Authorization: `Bearer ${userData.token}`
		}
	})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.json()
			} else {
				let error = new Error(response.statusText)
				error.response = response
				throw error
			}
		})
		.then(data => {
            alert('Успешно')
		})
		.catch(e => {
            alert('Ошибка на сервере')
			console.log(e)
		})
}
