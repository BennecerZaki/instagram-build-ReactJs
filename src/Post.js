import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Post.css"

function Post({ imageURL, username, caption, location }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg" 
                />
                <div className="post__userInfo">
                    <p><strong>{username}</strong></p>
                    <p>{location}</p>
                </div>
            </div>
            
            <img className="post__image" src={imageURL} alt="imagealt"/>
            <p className="post__text"><strong>{username} : </strong> {caption}</p>
        </div>
    )
}

export default Post
