import { useEffect, useState } from 'react'
import { fetchPosts } from '../../apis'
import { fetchAuthorsPosts } from '../../apis'
import { FormattedMessage } from 'react-intl'
import { Likes } from '../likes/likes'
import './style.css'

export const UserBlock = ({ reload, setButtonAnimation, language }) => {
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
			.catch(error => {
				console.log(error)
			})

		const interval = setInterval(() => {
			fetchPosts()
				.then(data => {
					setPosts(data.posts)
				})
				.catch(error => {
					console.log(error)
				})
		}, 60000)
		return () => {
			clearInterval(interval)
		}
	}, [reload])

	return (
		<div className='main'>
			{posts.map(post => {
				var today = new Date()

				var now = [
					Number(today.getUTCMonth().toLocaleString('ru')) + 1,
					Number(today.getUTCDate().toLocaleString('ru')),
					Number(today.getUTCHours().toLocaleString('ru')),
					Number(today.getUTCMinutes().toLocaleString('ru'))
				]
				const createdOld = post.createdAt.split('').splice(0, 10).join('')

				let created

				if (Number(post.createdAt.split('').splice(8, 2).join('')) === now[1]) {
					if (Number(post.createdAt.split('').splice(11, 2).join('')) === now[2]) {
						created = `${now[3] - Number(post.createdAt.split('').splice(14, 2).join(''))} ${language ? 'мин назад' : 'minutes ago'}`;
					}

					else if (Number(post.createdAt.split('').splice(11, 2).join('')) === now[2]-1) {
						if (now[3] + 60 - Number(post.createdAt.split('').splice(14, 2).join('')) <= 59) {
							created = `${now[3] + 60 - Number(post.createdAt.split('').splice(14, 2).join(''))} ${language ? 'мин назад' : 'minutes ago'}`;
						}
						else {
							created = language ? 'более часа назад' : 'more then hour ago'
						}
					}
					
					else {
						let hour
						let createdHour = now[2] - Number(post.createdAt.split('').splice(11, 2).join(''))
						if (createdHour <= 0) {
							createdHour = now[2] - Number(post.createdAt.split('').splice(11, 2).join('')) + 12
						}
						if (createdHour === 1 || createdHour === 21) {
							hour = language ? 'час' : 'hour'
						}
						else if (createdHour === 2 || createdHour === 3 || createdHour === 4 || createdHour === 22 || createdHour === 23) {
							hour = language ? 'часа' : 'hours'
						}
						else {
							hour = language ? 'часов' : 'hours'
						}
						created = `${createdHour} ${hour} ${language ? 'назад' : 'ago'}`
					}
				}

				else {
					created = createdOld
				}

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
										<FormattedMessage id='created' defaultMessage='created' />{' '}
										{created}
									</p>
								</div>
								<p className='post-description'>
									<FormattedMessage
										id='description'
										defaultMessage='description'
									/>{' '}
									{post.description}
								</p>
								<div className='post-like-block'>
									<Likes
										likes={post.likes.length}
										post={post}
										images={images}
										setButtonAnimation={setButtonAnimation}
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
