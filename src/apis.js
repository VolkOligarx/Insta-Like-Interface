import { userInfo } from './functions'

export const dislike = id => {
	const userData = userInfo()
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
		.catch(error => {
			console.error(error)
		})
}

export const like = id => {
	const userData = userInfo()
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
		.catch(error => {
			console.error(error)
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

export const fetchAuthorsPosts = (id) => {
	return fetch(`https://webdev-hw-api.vercel.app/api/v1/prod/instapro/user-posts/${id}`).then(
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
	const userData = userInfo()
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
		.catch(error => {
			console.error(error)
		})
}
