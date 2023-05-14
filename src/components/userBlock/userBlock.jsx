import { useEffect, useState } from "react"
import { allPostsApi } from "../../api's"
import UserContent from "../userContent/userContent"
import "./style.css"

export const UserBlock = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(allPostsApi)
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
                        <UserContent key={post.id} created={created} id={post.id} imageUrl={post.imageUrl} description={post.description} likes={post.likes}></UserContent>                    
                    )
                })
            }
        </div>
    )
}

export default UserBlock