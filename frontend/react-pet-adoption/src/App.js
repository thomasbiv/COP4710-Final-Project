import pets from './pets.PNG'
import Header from './components/HeaderComponent'
import Button from './components/Button'

import './App.css';

const custClick = () => {
  console.log('Customer login button clicked.') //Will add a new page here - Used to distinguish customer view
}

const empClick = () => {
  console.log('Employee login button clicked') //Will add a new page here - Used to distinguish employee view
}

function App() {
  return (
    <div className="App">
      <Header title = 'REACT Pet Adoption'/> {/*Title is a prop being passed to the Header/CustBtn/EmpBtn components for use*/}
      <Button title = 'Customer Login' onClick = {custClick}/>
      <Button title = 'Employee Login' onClick = {empClick}/>
      <div className="logo-container">
        <img src = {pets} className = "pet-logo" alt =""/>
      </div>
    </div>
  );
}

export default App;
