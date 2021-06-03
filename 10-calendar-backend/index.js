const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config'); 
require('dotenv').config();

// Create server with Express
const app = express();

// BD
dbConnection();

// CORS
app.use(cors());

// Directory Public
app.use( express.static('public') );

// Read and parse of body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth') );

// Listen Requests
app.listen( process.env.PORT, () => {
    console.log(`Server eject in port ${ process.env.PORT }`);
})
