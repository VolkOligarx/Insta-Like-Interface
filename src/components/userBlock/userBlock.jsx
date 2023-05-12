import { useEffect, useState } from "react"
import "./style.css"

export const UserBlock = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro')
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
            setPosts(data.posts)
            console.log(data.posts);
        })
        .catch((e) => {
            console.log(e);
        })
    },[])


    return (
        <div className="main">
            {
                posts.map((post) => {
                    const created = post.createdAt.split('').splice(0,10).join('')

                    return (
                        <div key={post.id}>
                            <img className="postImage" src={post.imageUrl} alt='postImage'></img> 
                            <div className="postText">
                                <p>Создан: {created}</p>
                                <p>Описание: {post.description}</p>
                                <img src="./img/like.png" className="like" alt="like"></img>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserBlock