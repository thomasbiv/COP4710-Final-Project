import pets from './pets.PNG'
import Header from './components/HeaderComponent'
import Button from './components/Button'
import './App.css';
import {useState} from 'react'

function App() {
  const [btnToggle, setBtnToggle] = useState(0);
  return (
    <div className="App">
      {btnToggle === 0
        ? <div>
            <Header title = 'REACT Pet Adoption'/> 
            <Button title = 'Customer Login' onClick = {() => setBtnToggle(1)}/> {/*Clicking this button will change webpage to 'Customer State'*/}
            <Button title = 'Employee Login' onClick = {() => setBtnToggle(2)}/> {/*Clicking this button will change webpage to 'Employee State'*/}
            <div className="logo-container">                                     {/*(Each state will display the associated database view for that profile type)*/}
              <img src = {pets} className = "pet-logo" alt =""/>
            </div>
          </div>
        : btnToggle === 1
        ? <div>
            <div>Welcome valued customer!</div>
            <div>Customer database view is displayed here! (Available Pets (and their medical issues), Pets foster condition, etc.)</div>
            <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
          </div>
        :
          <div>
            <div>Welcome valued employee!</div>
            <div>Employee database view is displayed here! (Pets (and their medical issues), Employee Info, Customer Info, etc.)</div>
            <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
          </div>
      } 
    </div>
  );
}

export default App;
