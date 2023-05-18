import { useEffect, useState } from 'react'
import { dislike, like } from '../../apis'
import { userInfo } from '../../functions'
import { FormattedMessage } from 'react-intl'
import './style.css'

export const UserContent = props => {
	//props.language, props.id, props.created, props.imageUrl, props.description, props.likes
	const [isLiked, setIsLiked] = useState(true)
	const [likeCount, setLikeCount] = useState(0)

	const userData = userInfo()

	const wasLiked = props.likes.filter(like => {
		return like.id === userData._id
	})

	useEffect(() => {
		if (wasLiked.length >= 1) {
			setIsLiked(false)
		}
	}, [])

	const changeLike = () => {
		if (isLiked === true) {
			like(props.id)
			setIsLiked(false)
			setLikeCount(likeCount + 1)
		} else {
			dislike(props.id)
			setIsLiked(true)
			setLikeCount(likeCount - 1)
		}
	}

	return (
		<div key={props.id}>
			<img className='post-image' src={props.imageUrl} alt='propsImage'></img>
			<div className='post-text'>
				<p>
					<FormattedMessage id='created'/> {props.created}
				</p>
				<p>
					<FormattedMessage id='description'/>{' '}
					{props.description}
				</p>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<p>
                    <FormattedMessage id='likes'/>{' '}
						{props.likes.length + likeCount}
					</p>
					<img
						onClick={() => {
							changeLike()
						}}
						src={isLiked ? './img/like.png' : './img/liked.png'}
						className='like'
						alt='like'
					></img>
				</div>
			</div>
		</div>
	)
}

export default UserContent
