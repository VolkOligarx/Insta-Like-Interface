import { useEffect } from 'react'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { dislike, like } from '../../apis'
import { userInfo } from '../../functions'
import Modal from '../modal/modal'
import '../userBlock/style.css'

export const Likes = ({likes, post, images, setButtonAnimation}) => {
	const [isLiked, setIsLiked] = useState(true)
	const [likeCount, setLikeCount] = useState(0)
    const [modalActive, setModalActive] = useState(false)
	const [userData, setUserData] = useState(userInfo())

	useEffect(() => {
		setUserData(userInfo())
	},[userInfo().token])

	const wasLiked = post.likes.filter(like => {
		return like.id === userData._id
	})

	useEffect(() => {
		if (wasLiked.length >= 1) {
			setIsLiked(false)
		}
	}, [wasLiked.length])

	const changeLike = () => {
		if (userData.token) {
			if (isLiked === true) {
				like(post.id)
				setIsLiked(false)
				setLikeCount(likeCount + 1)
			} else {
				dislike(post.id)
				if (wasLiked.length >= 1) {
					setLikeCount(1)
				}
				setIsLiked(true)
				setLikeCount(likeCount - 1)
			}
		} else {
            setModalActive(true)
            setTimeout(() => {
                setButtonAnimation(true)
                setTimeout(() => {
                    setButtonAnimation(false)
                }, 3000);    
            }, 6200);
            setTimeout(() => {
                setModalActive(false)
            }, 6000);
		}
	}

	return (
		<div className='post-like-block'>
			<p>
				<FormattedMessage id='likes' defaultMessage='likes'/> {likes + likeCount}
			</p>
			<img
				onClick={() => {
					changeLike()
				}}
				src={isLiked ? images.like : images.dislike}
				className='like'
				alt='like'
			></img>
			<Modal active={modalActive} setActive={setModalActive}>
				<FormattedMessage id='authorize' defaultMessage='authorize'>
					{placeholder => <h1 className='modal-h1'>{placeholder}</h1>}
				</FormattedMessage>
			</Modal>
		</div>
	)
}
