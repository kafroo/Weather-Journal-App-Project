// Main Used Packages
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// our server port 
const port = 8080;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log(`Our server is running on port http://localhost:${port}`)
})

app.get('/getTheAllData', (req, res) => {
    res.send(projectData);
})

app.post('/postTheAllData', (req, res) => {
    projectData = { ...req.body}
    res.send(projectData).status(200).end();
})
