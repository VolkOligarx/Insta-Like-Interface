import { useEffect } from 'react'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { dislike, like } from '../../apis'
import { userInfo } from '../../functions'
import '../userBlock/style.css'

export const Likes = props => {
    const [isLiked, setIsLiked] = useState(true)
    const [likeCount, setLikeCount] = useState(0)

    const userData = userInfo()

    const wasLiked = props.post.likes.filter(like => {
        return like.id === userData._id
    })

    useEffect(() => {    
        if (wasLiked.length >= 1) {
            setIsLiked(false)
        }    
    },[])



    const changeLike = () => {
        if (isLiked === true) {
            like(props.post.id)
            setIsLiked(false)
            setLikeCount(likeCount + 1)
        } else {
            dislike(props.post.id)
            if (wasLiked.length >= 1) {
                setLikeCount(1)
            }
            setIsLiked(true)
            setLikeCount(likeCount - 1)
        }
    }

	return (
		<div className='post-like-block'>
			<p>
				<FormattedMessage id='likes' /> {props.likes + likeCount}
			</p>
			<img
				onClick={() => {
					changeLike()
				}}
				src={isLiked ? props.images.like : props.images.dislike}
				className='like'
				alt='like'
			></img>
		</div>
	)
}
