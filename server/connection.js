const {Client} = require('pg')

const client  = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "animalShelter"
})

module.exports = client