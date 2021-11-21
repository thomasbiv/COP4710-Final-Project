const express = require("express")
const client = require('./connection.js')
const bodyParser = require("body-parser")
const cors = require("cors")

const port = 4000
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

client.connect();

app.get("/customerLogin", (req, res) => {
    const customerId = req.body.customerId
    const password = req.body.password
    client.query("SELECT * FROM customer WHERE customerid = 123 AND password = password", [customerId, password],
    (err, result) => {
        console.log(err)
        console.log(result.rows)
        if(err) {
            res.send({err: err});
        } 
        if (result){
            res.send(result.rows)
        } else {
            res.send({message: "wrong id/password"})
        }
        
    })
    client.end;
})

app.get("/customerRegister", (req, res) => {
    const customerId = req.body.regCustomerId
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address
    const password = req.body.regPassword
    client.query("INSERT INTO customer VALUES (?,?,?,?,?,?,?)", [customerId, firstName, lastName, email, phone, address, password],
    (err, result) => {
        console.log(result)
    })
    client.end;
})