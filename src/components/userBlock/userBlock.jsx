import { useEffect, useState } from 'react'
import { fetchPosts } from '../../apis'
import UserContent from '../userContent/userContent'
import './style.css'

export const UserBlock = () => {
	const [posts, setPosts] = useState([])
	const images = {
		like: './img/like.png',
		dislike: './img/liked.png',
		avatar: './img/avatar.png'
	}

	useEffect(() => {
		fetchPosts()
		.then(data => {
			setPosts(data.posts)
		})
		.catch(e => {
			console.log(e)
		})
		
		const interval = setInterval(() => {
		fetchPosts()
			.then(data => {
				setPosts(data.posts)
			})
			.catch(e => {
				console.log(e)
			})
		}, 60000);
		return () => {clearInterval(interval)}
	}, [])

	return (
		<div className='main'>
			{posts.map(post => {
				const created = post.createdAt.split('').splice(0, 10).join('')

				return (
					<UserContent
						key={post.id}
						created={created}
						id={post.id}
						imageUrl={post.imageUrl}
						description={post.description}
						likes={post.likes}
						user={post.user}
						images={images}
					></UserContent>
				)
			})}
		</div>
	)
}

export default UserBlock
