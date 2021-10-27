import pets from './pets.PNG'
import Header from './components/HeaderComponent'
import CustBtn from './components/CustBtnComponent'
import EmpBtn from './components/EmpBtnComponent'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header title = 'REACT Pet Adoption'/> {/*Title is a prop being passed to the Header/CustBtn/EmpBtn components for use*/}
      <CustBtn title = 'Customer Login'/>
      <EmpBtn title = 'Employee Login'/>
      <div className="logo-container">
        <img src = {pets} className = "pet-logo" alt =""/>
      </div>
    </div>
  );
}

export default App;
