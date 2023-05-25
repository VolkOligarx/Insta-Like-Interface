import { useEffect, useState } from 'react'
import { dislike, like } from '../../apis'
import { userInfo } from '../../functions'
import { FormattedMessage } from 'react-intl'
import './style.css'

export const UserContent = ({
	created,
	id,
	imageUrl,
	description,
	likes,
	user,
	images
}) => {
	//props.id, props.created, props.imageUrl, props.description, props.likes, props.images
	const [isLiked, setIsLiked] = useState(true)
	const [likeCount, setLikeCount] = useState(0)

	const userData = userInfo()

	const wasLiked = likes.filter(like => {
		return like.id === userData._id
	})

	useEffect(() => {
		if (wasLiked.length >= 1) {
			setIsLiked(false)
		}
	}, [])

	const changeLike = () => {
		if (isLiked === true) {
			like(id)
			setIsLiked(false)
			setLikeCount(likeCount + 1)
		} else {
			dislike(id)
			setIsLiked(true)
			setLikeCount(likeCount - 1)
		}
	}

	return (
		<div key={id}>
			<img className='post-image' src={imageUrl} alt='propsImage'></img>
			<div className='post-text'>
				<div className='post-author-block'>
					<div className='post-author'>
						<img className='post-author-img' src={user.imageUrl ? user.imageUrl : images.avatar} alt='avatar'/>
						<div className='post-author-name-block'>
							<p>{user.name}</p>
							<p className='post-author-login'>{user.login}</p>
						</div>
					</div>
					<p style={{margin: '0'}}>
						<FormattedMessage id='created' /> {created}
					</p>
				</div>
				<p>
					<FormattedMessage id='description' /> {description}
				</p>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<p>
						<FormattedMessage id='likes' /> {likes.length + likeCount}
					</p>
					<img
						onClick={() => {
							changeLike()
						}}
						src={isLiked ? images.like : images.dislike}
						className='like'
						alt='like'
					></img>
				</div>
			</div>
		</div>
	)
}

export default UserContent
