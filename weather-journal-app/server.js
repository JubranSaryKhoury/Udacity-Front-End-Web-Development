/*Jubran Khoury*/

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
const port = 8000; // port 8000
const server = app.listen(port, () => {
  console.log(`Server running on localhost: ${port}`); // display the port on the terminal
});

// GET route to return projectData
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST route
app.post("/add", (req, res) => {
  const newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    feel: req.body.feel,
  };
  projectData = newEntry;
  res.send(projectData);
});
