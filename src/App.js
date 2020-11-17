import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import { auth, db } from './firebase';
import ImageUpload from './ImageUpload';
import Post from './Post';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();


  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null)


  useEffect(() => {
    db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // user has logged in ...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  const handleSignUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser => (authUser.user.updateProfile({
      displayName : username
    }
    )))
    .catch((error) => alert(error.message));
    setOpen(false);
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password).catch(error => alert(error.message));
    setOpenSignIn(false);
  }

  const quit = (event) => {
    setEmail("");
    setUsername("");
    setPassword("");
    return auth.signOut();
  }


  return (
    <div className="App">

      <div className="app__header">
        <img 
          className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt="instagram logo"
        />
        <input type="text" placeholder="Rechercher"/>
        {
          user ? (
            <Button onClick={quit}>Quit</Button>
          ) : (
            <div className="login-container">
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
              <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
            </div>
          )
        }
      </div>
      <h1 id="H1">Hello Zaki</h1>
      {
        user?.displayName ? (
          <ImageUpload username={user?.displayName} />
        ) : (
          <h3>Sorry you need to login</h3>
        )
      }
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form>
            <center className="app__signUp">
              <img 
                className="app__headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt="instagram logo"
              />
              <Input 
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input 
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleSignUp}>Sign Up Now !</Button>
            </center>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img 
              className="app__headerImage" 
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="Instagram-Logo"
              />
            </center>
              <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={handleSignIn}>Log In</Button>
          </form>
        </div>
      </Modal>

      {
        posts.map(({id, post}) => (
          <Post 
            imageURL={post.imageURL}
            username={post.username}
            caption={post.caption}
            location={post.location}
            key={id}
          /> 
        ))
      }

    </div>
  );
}

export default App;
