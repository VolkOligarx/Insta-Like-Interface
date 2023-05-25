import { useEffect, useState } from 'react'
import { fetchPosts } from '../../apis'
import UserContent from '../userContent/userContent'
import './style.css'

export const UserBlock = props => {
	const [posts, setPosts] = useState([])

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
						language={props.language}
						key={post.id}
						created={created}
						id={post.id}
						imageUrl={post.imageUrl}
						description={post.description}
						likes={post.likes}
					></UserContent>
				)
			})}
		</div>
	)
}

export default UserBlock
