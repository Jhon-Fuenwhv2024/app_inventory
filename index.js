const express = require('express')
const {getConnection} = require('./database/mongoose-db');
const cors = require('cors');
require('dotenv').config();


const app = express()
const port = process.env.PORT;

// implementamos cors
app.use(cors());

getConnection();


//Parseo de los datos a JSON

app.use(express.json());

app.use('/brandRou', require('./routes/brandRou'));
app.use('/inventoryRou', require('./routes/inventoryRou'));
app.use('/statusEquipmentRou', require('./routes/statusEquipmentRou'));
app.use('/typeEquipmentRou', require('./routes/typeEquipmentRou'));
app.use('/userRou', require('./routes/userRou'));


app.listen( port, () =>{
    console.log('App listening on port ', port, '!');
});