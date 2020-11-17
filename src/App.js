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

      <Post 
        imageURL="https://images4.alphacoders.com/936/936378.jpg"
        username="Zaki BENNECER"
        caption="Wow it works 1/100 Day"
        location="Batna, Algeria"
      />

    </div>
  );
}

export default App;
