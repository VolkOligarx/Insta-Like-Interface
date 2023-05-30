import { useEffect, useState } from 'react'
import { fetchPosts } from '../../apis'
import { fetchAuthorsPosts } from '../../apis'
import { FormattedMessage } from 'react-intl'
import { Likes } from '../likes/likes'
import './style.css'

export const UserBlock = props => {
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
		}, 60000)
		return () => {
			clearInterval(interval)
		}
	}, [props.reload])

	return (
		<div className='main'>
			{posts.map(post => {
				const created = post.createdAt.split('').splice(0, 10).join('')

				const changeAuthor = () => {
					fetchAuthorsPosts(post.user.id)
						.then(data => {
							setPosts(data.posts)
						})
						.catch(e => {
							console.log(e)
						})
				}

				return (
					<div className='post' key={post.id}>
						<div className='post-wrapper'>
							<div className='post-image-block'>
								<img
									className='post-image'
									src={post.imageUrl}
									alt='propsImage'
								></img>
							</div>
							<div className='post-text'>
								<div className='post-author-block'>
									<div
										className='post-author'
										onClick={() => {
											changeAuthor()
										}}
									>
										<img
											className='post-author-img'
											src={
												post.user.imageUrl ? post.user.imageUrl : images.avatar
											}
											alt='avatar'
										/>
										<div className='post-author-name-block'>
											<p>{post.user.name}</p>
											<p className='post-author-login'>{post.user.login}</p>
										</div>
									</div>
									<p style={{ margin: '0' }}>
										<FormattedMessage id='created' /> {created}
									</p>
								</div>
								<p className='post-description'>
									<FormattedMessage id='description' /> {post.description}
								</p>
								<div className='post-like-block'>
									<Likes
										likes={post.likes.length}
										post={post}
										images={images}
									></Likes>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default UserBlock
