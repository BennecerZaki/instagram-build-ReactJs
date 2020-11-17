import { Button, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { db, storage } from './firebase'
import "./ImageUpload.css"
import firebase from "firebase"

function ImageUpload({username}) {

    const [caption, setCaption] = useState("")
    const [location, setLocation] = useState("")
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)
    
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        // Ajouter la photo au storage Firebase
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)* 100
                );
                setProgress(progress);
            },
            (error) => {
                // la fonction d'erreur
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function ... 
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        imageURL : url,
                        username: username,
                        location: location
                    });
                    setProgress(0);
                    setCaption("");
                    setLocation("");
                    setImage(null);
                })
            }
        )
    }

    return (
        <div className="Uploader">
            <progress value={progress ? progress : 0} max="100" />
            <input type="text" placeholder="Enter a caption ... " onChange={ event => setCaption(event.target.value)} value={caption} />
            <input type="text" placeholder="Enter your location... " onChange={ event => setLocation(event.target.value)} value={location} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
