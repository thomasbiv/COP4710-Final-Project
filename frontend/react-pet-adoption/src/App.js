
import Header from './components/HeaderComponent'
import Button from './components/Button'
import image from './images/pets.PNG'
import './form.css';
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
            <div className="logo-container">                                     {/*(Each state will display the associated database view*/}
              <img src = {image} className = "pet-logo" alt =""/>
            </div>
          </div>
        : btnToggle === 1
        ? <div>
            <div className = "form-box">
            render() {
            CustomerLoginForm()
            }   
            </div>
            Customer database view is displayed here! (Available Pets (and their medical issues), Pets foster condition, etc.)
            <br/>
            <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
          </div>
        :
          <div>
            <div className="form-box">
            render() {
            EmployeeLoginForm()
            } 
            </div>
            <div>Employee database view is displayed here! (Pets (and their medical issues), Employee Info, Customer Info, etc.)</div>
            <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
          </div>
      } 
    </div>
  );
}

function CustomerLoginForm() {

  return (
    <form>
      <label>Welcome Customer!</label>
      <br/>
      <input type="text" name="customerId" placeholder="Customer ID"/>
      <br/>
      <input type="text" name="customerPassword" placeholder="Password"/>
      <br/>
      <input type="submit" value="Submit" className = "btn"/>
    </form>
  )
}

function EmployeeLoginForm() {

  return (
    <form>
      <label>Welcome Employee!</label>
      <br/>
      <input type="text" name="employeeId" placeholder="Employee ID"/>
      <br/>
      <input type="text" name="employeePassword" placeholder="Password"/>
      <br/>
      <input type="submit" value="Submit" className = "btn"/>
    </form>
    )
}
export default App;
