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
    client.query(`SELECT name, color, sex, mchipped, breed, shots, weight, rescdate, DATE_PART('year', AGE(estdob)) as age, coatlength, fixed FROM pets WHERE adoptedBY IS NULL`,
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