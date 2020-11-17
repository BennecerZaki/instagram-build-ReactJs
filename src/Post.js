import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Post.css"

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt="Zaki BENNECER" 
                    src="/static/images/avatar/1.jpg" 
                />
                <div className="post__userInfo">
                    <p><strong>Username</strong></p>
                    <p>Batna, Algiers</p>
                </div>
            </div>
            
            <img className="post__image" src="https://images4.alphacoders.com/936/936378.jpg" alt="imagealt"/>
            <p className="post__text"><strong>cleverqazi : </strong> Wow Day 1 Of 100 Challenge of Code</p>
        </div>
    )
}

export default Post
