
import Header from './components/HeaderComponent'
import Button from './components/Button'
import image from './images/pets.PNG'
import axios from 'axios'
import './form.css'
import './App.css'
import {useState} from 'react'

function App() {
  const [btnToggle, setBtnToggle] = useState(0);
  const [customerId, setCustomerId] = useState()
  const [password, setPassword] = useState("")
  const [regCustomerId, setCustId] = useState()
  const [firstName, setFirst] = useState("")
  const [lastName, setLast] = useState("")
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [regPassword, setRegPassword] = useState()
  const [loginStatus, setLoginStatus] = useState("")
  const [empId, setEmpId] = useState("")
  const [empPassword, setEmpPassword] = useState("")

  const login = async () => {
    setLoginStatus(null)
    if(customerId )
    axios.post("http://localhost:4000/customerLogin", {customerId: customerId, password: password}).then((response) => {
          if(response.data.message)
          {
            setLoginStatus(response.data.message)
          } else 
          {
            setLoginStatus("Hello, " + response.data[0].firstname)
            setBtnToggle(4)
          }
    })
  }

  const register = () => {
    axios.post("http://localhost:4000/customerRegister", {regCustomerId: regCustomerId, firstName: firstName, lastName: lastName, phone: phone, email: email, address: address, regPassword: regPassword}).then((response) => {
    if(response.data.message === "success")  
      setBtnToggle(4)
    })
  }

  const empLogin = async () => {
    setLoginStatus(null)
    axios.post("http://localhost:4000/employeeLogin", {empId: empId, empPassword: empPassword}).then((response) => {
      if(response.data.message)
      {
        setLoginStatus(response.data.message)
      } else 
      {
        setLoginStatus("Hello, " + response.data[0].firstname)
        setBtnToggle(5)
      }
    })
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
            <label>Welcome Customer!</label>
            <br/>
            <input type="text" placeholder="Customer ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setCustomerId(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            <br/>
            <button onClick={() => login()} className = 'btn'> Login</button>
            <button className = "btn" onClick = {() => setBtnToggle(3)}>Register</button>
            </div>
            <br/>
            <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
          </div>
        : btnToggle === 3
        ? <div>
          <div className = "form-box">
            <label>Welcome New Customer!</label>
            <br/>
            <input type="text" placeholder="Customer ID" pattern = "[0-9]*" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setCustId(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="First Name" onChange={(e) => {setFirst(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Last Name" onChange={(e) => {setLast(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Phone Number" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setPhone(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Address" onChange={(e) => {setAddress(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Password" onChange={(e) => {setRegPassword(e.target.value)}}/>
            <br/>
            <button onClick={register} className = 'btn'> Register</button> 
        </div>
        <br/>
        <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
      </div>
      : btnToggle === 4
      ? <div>
        <h1>{loginStatus}</h1>
        <br/>
        This is the customer view
        <br/>
        <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
        </div>
      : btnToggle === 5
      ? <div>
        <h1>{loginStatus}</h1>
        <br/>
        This is the employee view
        <br/>
        <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
        </div>
        : <div>
            <div className="form-box">
            <label>Welcome Employee!</label>
            <br/>
            <input type="text" placeholder="Employee ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setEmpId(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Password" onChange={(e) => {setEmpPassword(e.target.value)}}/>
            <br/>
            <button className = "btn" onClick={empLogin}> Login </button>
            </div>
            <Button title = 'Back' onClick = {() => setBtnToggle(0)}/>
          </div>
      } 
    </div>
  );
}

export default App;
