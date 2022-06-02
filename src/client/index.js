//Imports all main functions
//Comment out this code to test server
import { weatherAtdestination, getCurrentWeatherInfo, getForecastWeatherInfo, getDestinationInfo, postWeatherInfo, createPlan, moveEntry } from './js/app'
import './styles/style.scss'

export { weatherAtdestination, getCurrentWeatherInfo, getForecastWeatherInfo, getDestinationInfo, postWeatherInfo, createPlan, moveEntry }


//Uncomment this code to test server
/*
const allApi = require("../client/js/app.js");
const style = request("./styles/style.scss");


module.exports = {allApi}*/