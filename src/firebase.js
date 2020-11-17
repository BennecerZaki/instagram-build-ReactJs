import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAIBqAA4X0fqYxbT0SxwNydwwKRGWpUjqk",
    authDomain: "instagram-build-d6e5a.firebaseapp.com",
    databaseURL: "https://instagram-build-d6e5a.firebaseio.com",
    projectId: "instagram-build-d6e5a",
    storageBucket: "instagram-build-d6e5a.appspot.com",
    messagingSenderId: "460406115639",
    appId: "1:460406115639:web:0a8ea022f2b5a4fa88deb2",
    measurementId: "G-85B2LR69KD"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };