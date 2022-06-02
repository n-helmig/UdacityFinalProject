// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let path = require("path");
//If you want to test the server, uncomment the line below. Once you do that, comment out both the express and app variables that are under the line you just uncommented.
//const app = require("../client/js/app")
//Uncomment the next two lines to test server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));

//Sets servers port
const port = 8082

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// Setup Server
app.get("/", (req,res)=>{
	res.sendFile(path.resolve("src/client/views/index.html"));
});

//GET route
app.get("/recent", (req,res)=>{
	res.send(projectData);
});

//POST route
app.post("/add", (req,res)=>{
	projectData.date = req.body.date;
	projectData.city = req.body.city;
	projectData.country = req.body.country;
	projectData.weather = req.body.weather;
	projectData.temp = req.body.temp;
	projectData.precip = req.body.precip;
	projectData.rh = req.body.rh;
	projectData.wind_spd = req.body.wind_spd;
	
	res.send(projectData);
});
