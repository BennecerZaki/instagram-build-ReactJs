import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <img 
          className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt="instagram logo"
        />
        <input type="text" placeholder="Rechercher"/>
        <h4>Sign Up Sign In</h4>
      </div>
      <h1>Hello Zaki</h1>

      <Post />
      {/* Posts */}
      {/* Posts */}
      {/* Posts */}

    </div>
  );
}

export default App;
