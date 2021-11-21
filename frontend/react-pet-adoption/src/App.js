
import Header from './components/HeaderComponent'
import Button from './components/Button'
import image from './images/pets.PNG'
import axios from 'axios'
import './form.css'
import './App.css'
import {useState} from 'react'

function App() {
  const [btnToggle, setBtnToggle] = useState(0);
  const [customerId, setCustomerId] = useState("")
  const [password, setPassword] = useState("")
  const [RegCustomerId, setCustId] = useState("")
  const [firstName, setFirst] = useState("")
  const [lastName, setLast] = useState("")
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [regPassword, setRegPassword] = useState("")

  const login = () => {
    axios.post("http://localhost:4000/customerLogin", {customerId: customerId, password: password}).then(() => {alert("it works")})
  }

  const register = () => {
    axios.post("http://localhost:4000/customerRegister", {RegCustomerId: RegCustomerId, firstName: firstName, lastName: lastName, phone: phone, email: email, address: address, regPassword: regPassword}).then(() => {alert("it works")})
  }

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
            <form>
            <label>Welcome Customer!</label>
            <br/>
            <input type="text" placeholder="Customer ID" onChange={(e) => {setCustomerId(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            <br/>
            <button onClick={login} className = 'btn'> Login</button>
            <button className = "btn" onClick = {() => setBtnToggle(3)}>Register</button>
            </form> 
            </div>
            Customer database view is displayed here! (Available Pets (and their medical issues), Pets foster condition, etc.)
            <br/>
            <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
          </div>
        : btnToggle === 3
        ? <div>
          <div className = "form-box">
          <form>
            <label>Welcome New Customer!</label>
            <br/>
            <input type="text" placeholder="Customer ID" onChange={(e) => {setCustId(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="First Name" onChange={(e) => {setFirst(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Last Name" onChange={(e) => {setLast(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Phone Number" onChange={(e) => {setPhone(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Address" onChange={(e) => {setAddress(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Password" onChange={(e) => {setRegPassword(e.target.value)}}/>
            <br/>
            <button onClick={register} className = 'btn'> Register</button>
            </form> 
        </div>
        Customer database view is displayed here! (Available Pets (and their medical issues), Pets foster condition, etc.)
        <br/>
        <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
      </div>
        :
          <div>
            <div className="form-box">
            {
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
