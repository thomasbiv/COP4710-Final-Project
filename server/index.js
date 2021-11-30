const {Client} = require('pg')
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

const port = 4000

const client  = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "animalshelter"
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
        console.log(err)
    })
    client.end;
})
/*
// only accessible to employees
app.get("/allDogs", async (req, res) => {
    try {
        const allDogs = await client.query("SELECT * FROM Pets NATURAL JOIN Dogs");

        res.json(allDogs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// only accessible to employees
app.get("/allCats", async (req, res) => {
    try {
        const allCats = await client.query("SELECT * FROM Pets NATURAL JOIN Cats");

        res.json(allCats.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// only accessible to customers
// exclude --> RescDate, AdoptedBy, AdoptionDate
app.get("/someDogs", async (req, res) => {
    try {
        const someDogs = await client.query("SELECT PetID, Name, Color, Status, Sex, MChipped, Breed, Shots, Weight, EstDOB, CoatLength, Fixed, HouseTrained FROM Pets NATURAL JOIN Dogs");

        res.json(someDogs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// only accessible to customers
// exclude --> RescDate, AdoptedBy, AdoptionDate
app.get("/someCats", async (req, res) => {
    try {
        const someCats = await client.query("SELECT PetID, Name, Color, Status, Sex, MChipped, Breed, Shots, Weight, EstDOB, CoatLength, Fixed, DeClawed FROM Pets NATURAL JOIN Cats");

        res.json(someCats.rows);
    } catch (err) {
        console.error(err.message);
    }
});
*/
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})