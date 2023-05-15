import { useEffect, useState } from "react"
import { getCookie } from "../../functions"
import "./style.css"

export const UserContent = (props) => {
    const [isLiked, setIsLiked] = useState('./img/like.png')
    const [likeCount, setLikeCount] = useState(0)
    const token = getCookie('token')
    const _id = getCookie('_id')

    const wasLiked = props.likes.filter((like) => {
        return like.id === _id
    })

    useEffect(() => {
        if (wasLiked.length >= 1) {
            setIsLiked('./img/liked.png')
        }
    },[])

    const like = () => {
        if (isLiked === './img/like.png') {
            fetch(`https://webdev-hw-api.vercel.app/api/v1/volk/instapro/${props.id}/like`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()  
                }
                else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error 
                }
            })
            .then((data) => {
                console.log(data);
                setLikeCount(likeCount + 1)
            })
            .catch((e) => {
                console.log(e);
            })                    
            setIsLiked('./img/liked.png')
        }

        else {
            fetch(`https://webdev-hw-api.vercel.app/api/v1/volk/instapro/${props.id}/dislike`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()  
                }
                else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error 
                }
            })
            .then((data) => {
                console.log(data);
                setLikeCount(likeCount - 1)
            })
            .catch((e) => {
                console.log(e);
            })                    
            setIsLiked('./img/like.png')
        }
    }

    return (
        <div key={props.id}>
            <img className="postImage" src={props.imageUrl} alt='propsImage'></img> 
            <div className="postText">
                <p>Создан: {props.created}</p>
                <p>Описание: {props.description}</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <p>Лайков: {props.likes.length + likeCount}</p>
                    <img onClick={() => {like()}} src={isLiked} className="like" alt="like"></img>
                </div>
            </div>
        </div>
    )
}

export default UserContent