import pets from './pets.PNG'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>REACT Pet Adoption</h1>
      <button>Customer Login</button>
      <button>Employee Login</button>
      <div className="logo-container">
        <img src = {pets} className = "pet-logo" alt =""/>
      </div>
    </div>
  );
}

export default App;
