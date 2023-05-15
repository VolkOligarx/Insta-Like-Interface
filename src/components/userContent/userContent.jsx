import { useEffect, useState } from "react"
import { dislike, like } from "../../apis"
import { userInfo } from "../../functions"
import "./style.css"

export const UserContent = (props) => {
    const [isLiked, setIsLiked] = useState(true)
    const [likeCount, setLikeCount] = useState(0)

    const userData = userInfo()

    const wasLiked = props.likes.filter((like) => {
        return like.id === userData._id
    })

    useEffect(() => {
        if (wasLiked.length >= 1) {
            setIsLiked(false)
        }
    },[])

    const changeLike = () => {
        if (isLiked === true) {
            like(props.id)
            setIsLiked(false)
            setLikeCount(likeCount + 1)
        }

        else {
            dislike(props.id)
            setIsLiked(true)
            setLikeCount(likeCount - 1)
        }
    }

    return (
        <div key={props.id}>
            <img className="post-image" src={props.imageUrl} alt='propsImage'></img> 
            <div className="post-text">
                <p>{props.language ? 'Создан:' : 'Created:'} {props.created}</p>
                <p>{props.language ? 'Описание:' : 'Description:'} {props.description}</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <p>{props.language ? 'Лайков:' : 'Likes:'} {props.likes.length + likeCount}</p>
                    <img onClick={() => {changeLike()}} src={isLiked ? './img/like.png' : './img/liked.png'} className="like" alt="like"></img>
                </div>
            </div>
        </div>
    )
}

export default UserContent