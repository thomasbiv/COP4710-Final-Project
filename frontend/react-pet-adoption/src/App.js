
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

  //add a new pet : status is set to 'available' when inserting to table
  const [pID, setPetPID] = useState(0)
  const [name, setPetName] = useState("")
  const [color, setPetColor] = useState("")
  const [sex, setPetSex] = useState()
  const [mChipped, setPetMchipped] = useState(true)
  const [breed, setPetBreed] = useState("")
  const [shots, setPetShots] = useState(true)
  const [weight, setPetWeight] = useState(0)
  const [rescDate, setPetRescDate] = useState(new Date())
  const [estDOB, setPetEstDOB] = useState(new Date())
  const [coatLength, setPetCoatLength] = useState("short")
  const [fixed, setPetFixed] = useState(true)
  const [houseTrained, setHousetrained] = useState(null)
  const [declawed, setDeclawed] = useState(null)

  //delete pet
  const[deletePetId, setDeletePetId] = useState(0)

  //filter by age
  const[filterByAge, setFilterByAge] = useState([])

  //filter cats
  const[filterCats, setFilterCats] = useState([])


  //filter dogs
  const[filterDogs, setFilterDogs] = useState([])

  //add medical condition
  const [issue, setIssue] = useState("")
  const [pet, setPet] = useState(0)
  const [medications, setMeds] = useState("")
  const [extracareneeded, setECN] = useState(false)

  //delete medical condition
  const [deleteMedPetID, setDeleteMedPetID] = useState(0)
  const [deleteMedIssue, setDeleteMedIssue] = useState("")

  //facilitate foster
  const [fosterPetID, setFosterPetID] = useState()
  const [fosterCID, setFosterCID] = useState()

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }

  const [lockCats, setLockCats] = useState(false);
  const toggleLockCats = () => {
    setLockCats(!lockCats);
  }

  const [lockDogs, setLockDogs] = useState(false);
  const toggleLockDogs = () => {
    setLockDogs(!lockDogs);
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
    else 
    alert("There was an error, please try again.")
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

  useEffect(() => {//employee view
    axios.get("http://localhost:4000/employeeView", {}).then((response) => {
      setEmployeeView(response.data)
    })
  }, []);


  const facilitateAdoption = () => {
    axios.post("http://localhost:4000/facilitateAdoption", {petId: petId, adoptCustId: adoptCustId}).then((response) => {
    if(response.data.message === "success")  
      setBtnToggle(5)
    else
      alert("There was an error, please try again.")
    })
  }

  const addPet = () => {
    axios.post("http://localhost:4000/addPet", {pId: pID, name: name, color: color, sex: sex, mChipped: mChipped, breed: breed, shots:shots, weight: weight, rescDate: rescDate, estDOB: estDOB, coatLength: coatLength, fixed: fixed, houseTrained: houseTrained, declawed: declawed}).then((response) => {
    if(response.data.message === "success")  
      setBtnToggle(5)
    else
      alert("There was an error, please try again, make sure you enter a unique pet ID")
    })
  }

  const addMedicalCondition = () => {
    axios.post("http://localhost:4000/addMedicalCondition", {issue: issue, pet: pet, medications: medications, extracareneeded: extracareneeded}).then((response) => {
      if(response.data.message === "success")
        setBtnToggle(5)
      else
        alert("There was an error, please try again.")
    })
  }

  const deleteMedCondition = () => {
    axios.post("http://localhost:4000/deleteMedCondition", {deleteMedPetID: deleteMedPetID, deleteMedIssue: deleteMedIssue}).then((response) => {
      if (response.data.message === "success")
        setBtnToggle(5)
      else
        alert("There was an error, please try again, make sure you spelled it correctly and have the correct pet ID.")
    })
  }

  const deletePet = () => {
    axios.post("http://localhost:4000/deletePet", {deletePetId: deletePetId}).then((response) => {
    if(response.data.message === "success")  
      setBtnToggle(5)
    else
      alert("There was an error, please try again.")
    })
  }

  const facilitateFoster = () => {
    axios.post("http://localhost:4000/facilitateFoster", {fosterPetID: fosterPetID, fosterCID: fosterCID}).then((response) => {
    if(response.data.message === "success") {  
      setBtnToggle(5)
    }
    else
      alert("There was an error, please try again. Make sure the pet selected is not already adopted!")
    })
  }

  useEffect(() => {//filtered by age
    axios.get("http://localhost:4000/filterByAge", {}).then((response) => {
      setFilterByAge(response.data)
    })
  }, []);

  useEffect(() => {//cats
    axios.get("http://localhost:4000/filterCats", {}).then((response) => {
      setFilterCats(response.data)
    })
  }, []);

  useEffect(() => {//dogs
    axios.get("http://localhost:4000/filterDogs", {}).then((response) => {
      setFilterDogs(response.data)
    })
  }, []);

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
            <input type={passwordShown ? "text" : "password"} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
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
        <Button title = 'Sort by Age' onClick = {() => setBtnToggle(9)}/>
        <Button title = 'Cats' onClick = {() => setBtnToggle(10)}/>
        <Button title = 'Dogs' onClick = {() => setBtnToggle(11)}/>
        <Button title = 'Reset Filters' onClick = {() => setBtnToggle(4)}/>
        <br/>
        <br/>
        {displayCustomerView.map((val) => {
            return <h4 className = "leftAlign"> Name: {val.name} | Sex: {val.sex} | Age: {val.age} | Breed: {val.breed} | Color: {val.color}  | Coat Length: {val.coatlength} | Weight: {val.weight} lbs. | Up to Date on shots: {val.shots ? "Yes" : "No"} | Microchipped: {val.mchipped ? "Yes" : "No"} | Fixed: {val.fixed ? "Yes" : "No"} <hr className = "hr"/></h4>
        })}
        <br/>
        <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
        </div>
      : btnToggle === 9
      ? <div>
        <h1>{loginStatus}</h1>
        <br/>
        These are the pets that we currently have available
        <br/>
        <Button title = 'Sort by Age' onClick = {() => setBtnToggle(9)}/>
        <Button title = 'Cats' onClick = {() => setBtnToggle(10)}/>
        <Button title = 'Dogs' onClick = {() => setBtnToggle(11)}/>
        <Button title = 'Reset Filters' onClick = {() => setBtnToggle(4)}/>
        <br/>
        <br/>
        {filterByAge.map((val) => {
            return <h4 className = "leftAlign"> Name: {val.name} | Sex: {val.sex} | Age: {val.age} | Breed: {val.breed} | Color: {val.color}  | Coat Length: {val.coatlength} | Weight: {val.weight} lbs. | Up to Date on shots: {val.shots ? "Yes" : "No"} | Microchipped: {val.mchipped ? "Yes" : "No"} | Fixed: {val.fixed ? "Yes" : "No"} <hr className = "hr"/></h4>
        })}
        <br/>
        <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
        </div>
      : btnToggle === 10
      ? <div>
        <h1>{loginStatus}</h1>
        <br/>
        These are the pets that we currently have available
        <br/>
        <Button title = 'Sort by Age' onClick = {() => setBtnToggle(9)}/>
        <Button title = 'Cats' onClick = {() => setBtnToggle(10)}/>
        <Button title = 'Dogs' onClick = {() => setBtnToggle(11)}/>
        <Button title = 'Reset Filters' onClick = {() => setBtnToggle(4)}/>
        <br/>
        <br/>
        {filterCats.map((val) => {
            return <h4 className = "leftAlign"> Name: {val.name} | Sex: {val.sex} | Age: {val.age} | Breed: {val.breed} | Color: {val.color}  | Coat Length: {val.coatlength} | Weight: {val.weight} lbs. | Up to Date on shots: {val.shots ? "Yes" : "No"} | Microchipped: {val.mchipped ? "Yes" : "No"} | Fixed: {val.fixed ? "Yes" : "No"} | Declawed: {val.declawed ? "Yes" : "No"} <hr className = "hr"/></h4>
        })}
        <br/>
        <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
        </div>
      : btnToggle === 11
      ? <div>
        <h1>{loginStatus}</h1>
        <br/>
        These are the pets that we currently have available
        <br/>
        <Button title = 'Sort by Age' onClick = {() => setBtnToggle(9)}/>
        <Button title = 'Cats' onClick = {() => setBtnToggle(10)}/>
        <Button title = 'Dogs' onClick = {() => setBtnToggle(11)}/>
        <Button title = 'Reset Filters' onClick = {() => setBtnToggle(4)}/>
        <br/>
        <br/>
        {filterDogs.map((val) => {
            return <h4 className = "leftAlign"> Name: {val.name} | Sex: {val.sex} | Age: {val.age} | Breed: {val.breed} | Color: {val.color}  | Coat Length: {val.coatlength} | Weight: {val.weight} lbs. | Up to Date on shots: {val.shots ? "Yes" : "No"} | Microchipped: {val.mchipped ? "Yes" : "No"} | Fixed: {val.fixed ? "Yes" : "No"} | Housetrained: {val.housetrained ? "Yes" : "No"} <hr className = "hr"/></h4>
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
        <Button title = 'Remove a Pet' onClick = {() => setBtnToggle(8)}/>
        <Button title = 'Add a Medical Condition' onClick = {() => setBtnToggle(12)}/>
        <Button title = 'Remove a Medical Condition' onClick = {() => setBtnToggle(13)}/>
        <Button title = 'Facilitate Foster' onClick = {() => setBtnToggle(14)}/>
        <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
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
          <div className="form-box">
            <label>Add a new pet</label>
            <br />
            <input type="text" placeholder="Pet ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setPetPID(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Pet Name" onChange={(e) => {setPetName(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Color" onChange={(e) => {setPetColor(e.target.value)}}/>
            <br />
            <input type="text" placeholder="Breed" onChange={(e) => {setPetBreed(e.target.value)}}/>
            <br />
            <input type="text" placeholder="Weight (lbs)" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setPetWeight(e.target.value)}}/>
            <br/>
            <input type="text" maxLength = "1" placeholder="Sex (M/F)" onKeyPress={(e) => {if(!(/M/.test(e.key) || /F/.test(e.key)|| /f/.test(e.key)|| /m/.test(e.key))) { e.preventDefault()}}} onChange={(e) => {setPetSex(e.target.value)}}/>
            <br />
            <label>Rescued On</label>
            <br/>
            <input type="date" onChange={(e) => {setPetRescDate(e.target.value)}}/>
            <br />
            <label>Estimated DOB</label>
            <br/>
            <input type="date" onChange={(e) => {setPetEstDOB(e.target.value)}}/>
            <br/>
            <label>MicroChipped: </label>
            <select onChange={(e) => setPetMchipped(e.target.value)}>
              <option type = "bool" value="true">Yes</option>
              <option type = "bool" value="false">No</option>
            </select>
            <br />
            <label>Shots Received: </label>
            <select onChange={(e) => setPetShots(e.target.value)}>
              <option type = "bool" value="true" >Yes</option>
              <option type = "bool" value="false">No</option>
            </select>
            <br />
            <label>Fixed: </label>
            <select onChange={(e) => setPetFixed(e.target.value)}>
              <option type = "bool" value="true" >Yes</option>
              <option type = "bool" value="false">No</option>
            </select>
            <br />
            <label>Coat Length: </label>
            <select onChange={(e) => setPetCoatLength(e.target.value)}>
              <option type = "text" value="short" >Short</option>
              <option type = "text" value="medium" >Medium</option>
              <option type = "text" value="long">Long</option>
            </select>
            <br/>
            <label>Is It a dog or a cat?</label>
            <button disabled= {lockCats ? "disabled" : ""} onClick={toggleLockDogs} className = "btn"> Cat</button>
            <button disabled= {lockDogs ? "disabled" : ""} onClick={toggleLockCats} className = "btn"> Dog</button>
            <br/>
            <label>If it is a dog is it housetrained?</label>
            <select disabled= {lockCats ? "" : "disabled"} onChange={(e) => setHousetrained(e.target.value)}>
              <option  value="NULL" >Select</option>
              <option  value="true" >Yes</option>
              <option  value="false" >No</option>
            </select>
            <br/>
            <label>If it is a cat is it declawed?</label>
            <select disabled= {lockDogs ? "" : "disabled"}onChange={(e) => setDeclawed(e.target.value)}>
              <option  value="NULL" >Select</option>
              <option  value="true" >Yes</option>
              <option  value="false" >No</option>
            </select>
            <br/>
            <button className = "btn" onClick={addPet}> Add Pet </button>
            </div>
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
        : btnToggle === 8
        ? <div className="form-box">
          <label>Remove a Pet</label>
          <br/>
          <input type="text" placeholder="Pet ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setDeletePetId(e.target.value)}}/>
          <br/>
          <button className = "btn" onClick={deletePet}> Delete </button>
          <br/>
          <Button title = 'Back' onClick = {() => setBtnToggle(5)}/>
          <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
          </div>
        : btnToggle === 12
        ? <div>
          <div className="form-box">
          <label>Add a Medical Condition</label>
          <br />
          <input type="text" placeholder="Issue" onChange={(e) => {setIssue(e.target.value)}}/>
          <br />
          <input type="text" placeholder="Pet ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setPet(e.target.value)}}/>
          <br />
          <input type="text" placeholder="Medications" onChange={(e) => {setMeds(e.target.value)}}/>
          <br />
          <label>Extra Care Needed</label>
            <select>
              <option value="true" onChange={(e) => setECN(e.target.value)}>Yes</option>
              <option value="false" onChange={(e) => setECN(e.target.value)}>No</option>
            </select>
            <br />
            <button className = "btn" onClick={addMedicalCondition}> Add Medical Condition </button>
          </div>
          <Button title = 'Back' onClick = {() => setBtnToggle(5)}/>
          <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
          </div>
          : btnToggle === 13
          ? <div className="form-box">
            <label>Remove a Medical Condition</label>
            <br/>
            <input type="text" placeholder="Pet ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setDeleteMedPetID(e.target.value)}}/>
            <br/>
            <br />
            <input type="text" placeholder="Issue" onChange={(e) => {setDeleteMedIssue(e.target.value)}}/>
            <br />
            <button className = "btn" onClick={deleteMedCondition}> Remove </button>
            <br/>
            <Button title = 'Back' onClick = {() => setBtnToggle(5)}/>
            <Button title = 'Log Out' onClick = {() => setBtnToggle(0)}/>
            </div>
        : btnToggle === 14
        ? <div>
          <div className="form-box">
            <label>Facilitate a Foster</label>
            <br/>
            <input type="text" placeholder="Pet ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setFosterPetID(e.target.value)}}/>
            <br/>
            <input type="text" placeholder="Customer ID" onKeyPress={(e) => { if(!/[0-9]/.test(e.key)) { e.preventDefault()}}} onChange={(e) => {setFosterCID(e.target.value)}}/>
            <br/>
            <button className = "btn" onClick={facilitateFoster}> Complete Foster </button>
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
            <input type={passwordShown ? "text" : "password"} placeholder="Password" onChange={(e) => {setEmpPassword(e.target.value)}}/>
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
