const {Client} = require('pg')

const client  = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "animalShelter"
})

client.connect();

const query1 = 'Select * from customer';

client.query(query1, (err, res)=> {
    if(!err)
    {
        console.log(res.rows);
    } else 
    {
        console.log(err.message);
    }
    client.end;
})

