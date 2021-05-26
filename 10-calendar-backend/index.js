const express = require('express');
require('dotenv').config();

// Create server with Express
const app = express();

// Directory Public
app.use( express.static('public') );

// Routes
app.use('/api/auth', require('./routes/auth') );

// Listen Requests
app.listen( process.env.PORT, () => {
    console.log(`Server eject in port ${ process.env.PORT }`);
})
