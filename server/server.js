const express = require("express")
const client = require('./connection.js')
const bodyParser = require("body-parser")
const cors = require("cors")

const port = 4000
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

client.connect();

app.post("/customerLogin", (req, res) => {
    const customerId = req.body.customerId
    const password = req.body.password
    client.query(`SELECT * FROM customer WHERE customerid = ${customerId} AND "password" = '${password}'`,
    (err, result) => {
        if(err) 
        {
            console.log(err)
        } else if (result.rowCount == 1) 
        {
            res.send(result.rows)
        } else 
        {
            res.send({message: "incorrect"})
        }
    })
    client.end;
})

app.post("/customerRegister", (req, res) => {
    const regCustomerId = req.body.regCustomerId
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address
    const password = req.body.regPassword
    client.query(`INSERT INTO customer (customerid, firstname, lastname, email, phone, address, "password") VALUES (${regCustomerId}, '${firstName}', '${lastName}', '${email}', '${phone}', '${address}' , '${password}')`,
    (err, result) => {
        if(err)
        console.log(err.message)
        else
            res.send({message: "success"})
    })
    client.end;
})

app.post("/employeeLogin", (req, res) => {
    const empId = req.body.empId
    const empPassword = req.body.empPassword
    client.query(`SELECT firstname FROM employee WHERE employeeid = ${empId} AND "password" = '${empPassword}'`,
    (err, result) => {
        if(err) 
        {
            console.log(err)
        } else if (result.rowCount == 1) 
        {
            res.send(result.rows)
        } else 
        {
            res.send({message: "incorrect"})
        }
        
    })
    client.end;
})

app.get("/customerView", (req, res) => {
    client.query(`SELECT * FROM customerView`,
    (err, result) => {
        if(err) 
        {
            console.log(err)
        } else 
        {
            res.send(result.rows)
        }

    })
    client.end;
})

app.get("/employeeView", (req, res) => {
    client.query(`SELECT * FROM employeeView`,
    (err, result) => {
        if(err) 
        {
            console.log(err)
        } else 
        {
            res.send(result.rows)
        }
    })
    client.end;
})

app.post("/facilitateAdoption", (req, res) => {
    const petId = req.body.petId
    const adoptCustId = req.body.adoptCustId
    client.query(`UPDATE pets SET status = 'Adopted', adoptedby = ${adoptCustId}, adoptiondate = NOW() WHERE petid = ${petId}`,
    (err, result) => {
        if(err)
        console.log(err.message)
        else
            res.send({message: "success"})
    })
    client.end;
})

app.post("/addPet", (req, res) => {
    const pID = req.body.pId
    const name = req.body.name
    const color = req.body.color
    const sex = req.body.sex
    const mChipped = req.body.mChipped
    const breed = req.body.breed
    const shots = req.body.shots
    const weight = req.body.weight
    const rescDate = req.body.rescDate
    const estDOB = req.body.estDOB
    const coatLength = req.body.coatLength
    const fixed = req.body.fixed
    client.query(`INSERT INTO Pets(petid, name, status, color, sex, mchipped, breed, shots, weight, rescdate, estdob, coatlength, fixed) VALUES(${pID}, '${name}', 'Available', '${color}', '${sex}', ${mChipped}, '${breed}', ${shots}, ${weight},'${rescDate}', '${estDOB}', '${coatLength}', ${fixed});`,
    (err, result) => {
        if(err)
        console.log(err.message)
        else
            res.send({message: "success"})
    })
    client.end;
})

app.post("/deletePet", (req, res) => {
    const deletePetId = req.body.deletePetId
    client.query(`DELETE FROM pets WHERE petid = ${deletePetId}`,
    (err, result) => {
        if(err)
        console.log(err.message)
        else
            res.send({message: "success"})
    })
    client.end;
})

app.get("/filterByAge", (req, res) => {
    client.query(`SELECT * FROM customerView ORDER BY age asc`,
    (err, result) => {
        if(err) 
        {
            console.log(err)
        } else 
        {
            res.send(result.rows)
        }
    })
    client.end;
})

app.get("/filterCats", (req, res) => {
    client.query(`SELECT * FROM customerView, cats  WHERE customerView.petid = cats.petid`,
    (err, result) => {
        if(err) 
        {
            console.log(err)
        } else 
        {
            res.send(result.rows)
        }
    })
    client.end;
})

app.get("/filterDogs", (req, res) => {
    client.query(`SELECT * FROM customerView, dogs WHERE customerView.petid = dogs.petid`,
    (err, result) => {
        if(err) 
        {
            console.log(err)
        } else 
        {
            res.send(result.rows)
        }
    })
    client.end;
})