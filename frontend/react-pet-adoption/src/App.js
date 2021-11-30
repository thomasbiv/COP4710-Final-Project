
import Header from './components/HeaderComponent'
import Button from './components/Button'
import image from './images/pets.PNG'
import axios from 'axios'
import './form.css'
import './App.css'
import {useState} from 'react'
import {useEffect} from 'react'

function App() {
  const [btnToggle, setBtnToggle] = useState(0);
  //customer login
  const [customerId, setCustomerId] = useState()
  const [password, setPassword] = useState("")

  //customer registration
  const [regCustomerId, setCustId] = useState()
  const [firstName, setFirst] = useState("")
  const [lastName, setLast] = useState("")
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [regPassword, setRegPassword] = useState()
  const [loginStatus, setLoginStatus] = useState("")

  //employee login
  const [empId, setEmpId] = useState("")
  const [empPassword, setEmpPassword] = useState("")

  //customer view
  const [displayCustomerView, setCustomerView] = useState([])

  //employee view
  const [displayEmployeeView, setEmployeeView] = useState([])

  //facilitate adoption
  const [petId, setPetId] = useState()
  const [adoptCustId, setAdoptCustId] = useState()


  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }

  const login = async () => {
    setLoginStatus(null)
    if(customerId )
    axios.post("http://localhost:4000/customerLogin", {customerId: customerId, password: password}).then((response) => {
          if(response.data.message)
          {
            alert("Incorrect ID or password, please try again.")
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
        alert("Incorrect ID or password, please try again.")
      } else 
      {
        setLoginStatus("Hello, " + response.data[0].firstname)
        setBtnToggle(5)
      }
    })
  }

  useEffect(() => {//customer view
    axios.get("http://localhost:4000/customerView", {}).then((response) => {
      setCustomerView(response.data)
    })
  }, []);

  useEffect(() => {//eployee view
    axios.get("http://localhost:4000/employeeView", {}).then((response) => {
      setEmployeeView(response.data)
    })
  }, []);


  const facilitateAdoption = () => {
    axios.post("http://localhost:4000/facilitateAdoption", {petId: petId, adoptCustId: adoptCustId}).then((response) => {
    if(response.data.message === "success")  
      setBtnToggle(5)
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
            <input type={passwordShown ? "tex" : "password"} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            <br/>
            <button onClick={togglePassword} className = "btn"> Show Password</button>
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
        These are the pets that we currently have available
        <br/>
        <br/>
        {displayCustomerView.map((val) => {
            return <h4 className = "leftAlign"> Name: {val.name} | Sex: {val.sex} | Age: {val.age} | Breed: {val.breed} | Color: {val.color}  | Coat Length: {val.coatlength} | Weight: {val.weight} lbs. | Up to Date on shots: {val.shots ? "Yes" : "No"} | Microshipped: {val.mchipped ? "Yes" : "No"} | Fixed: {val.fixed ? "Yes" : "No"} <hr className = "hr"/></h4>
        })}
        <br/>
        <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
        </div>
      : btnToggle === 5
      ? <div>
        <h1>{loginStatus}</h1>
        <br/>
        <Button title = 'Add New Pet' onClick = {() => setBtnToggle(6)}/>
        <Button title = 'Facilitate Adoption' onClick = {() => setBtnToggle(7)}/>
        <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
        <br/>
        <br/>
        {displayEmployeeView.map((val) => {
          if (val.status === "available" || val.status === "Available")
            return <h5 className = "leftAlign"> Name: {val.name} | Sex: {val.sex} | Age: {val.age} | Status: {val.status} | Breed: {val.breed} | Color: {val.color}  | Coat Length: {val.coatlength} | Weight: {val.weight} lbs. | Up to Date on shots: {val.shots ? "Yes" : "No"} | Microshipped: {val.mchipped ? "Yes" : "No"} | Fixed: {val.fixed ? "Yes" : "No"} <hr className = "hr"/></h5>
          else 
            return <h5 className = "leftAlign"> Name: {val.name} | Sex: {val.sex} | Age: {val.age} | Status: {val.status} | Breed: {val.breed} | Color: {val.color}  | Coat Length: {val.coatlength} | Weight: {val.weight} lbs. | Up to Date on shots: {val.shots ? "Yes" : "No"} | Microshipped: {val.mchipped ? "Yes" : "No"} | Fixed: {val.fixed ? "Yes" : "No"} | Adopted By: {val.adoptedby} | Adoption Date: {val.adoptmonth}-{val.adoptday}-{val.adoptyear} <hr className = "hr"/></h5>
        })}
        </div>
        : btnToggle === 6
        ? <div>
          Add new pet
          <Button title = 'Back' onClick = {() => setBtnToggle(5)}/>
          <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
          </div>
        : btnToggle === 7
        ? <div>
          <div className="form-box">
            <label>Facilitate an Adoption</label>
            <br/>
            <input type="text" placeholder="Pet ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setPetId(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Customer ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setAdoptCustId(e.target.value)}}/>
            <br/>
            <button className = "btn" onClick={facilitateAdoption}> Complete Adoption </button>
            </div>
          <br/>
          <Button title = 'Back' onClick = {() => setBtnToggle(5)}/>
          <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
          </div>
        : <div>
            <div className="form-box">
            <label>Welcome Employee!</label>
            <br/>
            <input type="text" placeholder="Employee ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setEmpId(e.target.value)}}/>
            <br/>
            <input type={passwordShown ? "tex" : "password"} placeholder="Password" onChange={(e) => {setEmpPassword(e.target.value)}}/>
            <br/>
            <button onClick={togglePassword} className = "btn"> Show Password</button>
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
