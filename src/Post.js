import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import firebase from "firebase"
import "./Post.css"

function Post({ imageURL, username, caption, location, postId, user}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("")

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments").orderBy("timestamp","desc")
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map((doc)=>doc.data()))
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            comment: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment("");
    }

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

            <div className="post_comments">
                {
                    comments.map((comment) => (
                        <p>
                            <strong>{comment.username} : </strong> {comment.comment}
                        </p>
                    ))
                }
            </div>

            {
                user && (
                    <form className="post__commentBox">
                        <input 
                            type="text" 
                            className="post__input" 
                            placeholder="Add a comment" 
                            value={comment} 
                            onChange={e => setComment(e.target.value)}
                        />
                        <button
                            disabled={!comment}
                            className="post__button"
                            type="submit"
                            onClick={postComment}
                        >
                            POST
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default Post
