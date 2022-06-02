/* eslint-env es6 */
/* eslint-disable no-console */

//This is the code needed to run the server

const runtime = require('regenerator-runtime/runtime');
const allApi = require("../../server/apiUrls");

const express = require("express");
const apps = express();



let d = new Date();
let todaysDate = new Date().toISOString().slice(0, 10);
document.addEventListener("DOMContentLoaded",()=>{
	document.getElementById("generate").addEventListener("click", weatherAtDestination);
    document.getElementById("departureDate").setAttribute("min",todaysDate);
})

let latitude = "";
let longitude ="";

//Gets the weather at the destination input
async function weatherAtDestination(){
	const destination = document.getElementById("destination").value;
	const departureDate = document.getElementById("departureDate").value;
	const tdate = new Date(todaysDate);
	const ddate = new Date(departureDate);
	const timeDifference = Math.abs(ddate - tdate);
	const dateDifference = Math.ceil(timeDifference / (24*60*60*1000)); 
		
	const destinationInfo = await getDestinationInfo(destination);
	if (destinationInfo[0] !== undefined){
		if(departureDate === ""){
			document.getElementById("error").innerHTML = "Please set your departure date correctly.";
		} else {
			if (dateDifference<7){
				const weather = await getCurrentWeatherInfo(destinationInfo[0]);

				// Post the weather information
				await postWeatherInfo("/add",{
					date: departureDate,
					city: weather.data[0].city_name,
					country: weather.data[0].country_code,
					weather: weather.data[0].weather.description,
					temp: weather.data[0].temp,
                    wind_spd: Math.round(weather.data[0].wind_spd*10)/10,
					rh: Math.round(weather.data[0].rh*10)/10,
				}).then(function(postResponse){
                            moveEntry();
				});

			} else {
				const weather = await getForecastWeatherInfo(destinationInfo[0]);


				// Post the weather information
				await postWeatherInfo("/add",{
					date: departureDate,
					city: weather.city_name,
					country: weather.country_code,
					weather: weather.data[0].weather.description,
					temp: weather.data[0].temp,
                    wind_spd: Math.round(weather.data[0].wind_spd*10)/10,
					rh: Math.round(weather.data[0].rh*10)/10,
				}).then(function(postResponse){
                        moveEntry();
				});			
			}
		}
	}
	document.getElementById("destination").value = "";
	document.getElementById("departureDate").value = "";	
};

//Gets the destination info which will be used to get the weather
const getDestinationInfo = async function(destination){
	try {
		const destinationLocation = await fetch(allApi.openWeatherUrl + destination + allApi.openWeatherApi);
		const destinationData = await destinationLocation.json();
		
		if (!destinationLocation.ok || destinationData.length === 0) {
			document.getElementById("error").innerHTML = "City name not found! Please double check the name.";
			throw new Error("Failed to receive weather information");
		};

		return destinationData;
	} catch(error) {
		console.log(`Error: ${error}`);
	}
};

const getCurrentWeatherInfo = async function(destinationInfo){
	const weatherInfo = await fetch(allApi.weatherBitCurrent + destinationInfo.lat.toString() + "&lon=" + destinationInfo.lon.toString() + allApi.weatherBitApi);
	
	if(!weatherInfo.ok){
		document.getElementById("error").innerHTML = "Unable to receive cities weather information. Try another city.";
		throw new Error("Failed to receive weather information");
	}
	
	try {
		const weatherData = await weatherInfo.json();
		return weatherData;
	} catch (error){
		console.log(`Error: ${error}`);
	}
	
};

const getForecastWeatherInfo = async function(destinationInfo){
	const weatherInfo = await fetch(allApi.weatherBitForecast + destinationInfo.lat.toString() + "&lon=" + destinationInfo.lon.toString() + allApi.weatherBitApi);
	
	if(!weatherInfo.ok){
		document.getElementById("error").innerHTML = "Unable to receive cities weather information. Try another city.";
		throw new Error("Failed to receive weather information");
	}
	
	try {
		const weatherData = await weatherInfo.json();
		return weatherData;
	} catch (error){
		console.log(`Error: ${error}`);
	}
	
};



const postWeatherInfo = async function(url="", data={}){
	const response = await fetch(url, {
			method: "POST", 
			credentials: "same-origin",
			headers: {
				 "Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});	
	
	try {	
		const newData = await response.json();
		return newData;
	} catch (error){
		console.log("Error", error);
	}
};

const createPlan = async function(){	
	try {
		const request = await fetch("/recent");
		const recentDestination = await request.json();
		
		const getImage = await fetch(allApi.pixabayUrl + allApi.pixabayApi + "&q=" + recentDestination.city +"&image_type=photo&orientation=horizontal&category=travel&min_width=620&min_height=420");
		const imageList = await getImage.json();
		const imageUrl = imageList.hits[0].webformatURL;		
		
		let newDestination = document.createElement("div");
		let newImage = document.createElement("img");
		let newInfo = document.createElement("div");
		newDestination.classList.add("newEntry");
        newDestination.setAttribute("id", recentDestination.date);
        newDestination.setAttribute("name", recentDestination.city);
		newInfo.classList.add("weatherInfo");
		newImage.setAttribute("src", imageUrl);
		newImage.setAttribute("alt", recentDestination.city);
		newImage.classList.add("cityImage");
		newDestination.appendChild(newImage);
		
		let dateDiv = document.createElement("div")
		let locationDiv = document.createElement("div");
		let weatherDiv = document.createElement("div");
		let tempDiv = document.createElement("div");
		let rhDiv = document.createElement("div");
		
		dateDiv.innerHTML = `Departure Date: ${recentDestination.date}`;
		locationDiv.innerHTML = `Location: ${recentDestination.city}, ${recentDestination.country}`;
		weatherDiv.innerHTML = `Weather: ${recentDestination.weather}`;
		tempDiv.innerHTML = `Temperature(C): ${recentDestination.temp}`;
		rhDiv.innerHTML = `Relative Humidity(%): ${recentDestination.rh}`;
		
		newInfo.appendChild(dateDiv);
		newInfo.appendChild(locationDiv);
		newInfo.appendChild(weatherDiv);
		newInfo.appendChild(tempDiv);
		newInfo.appendChild(rhDiv);
		
		let planDelete = document.createElement("button");
		planDelete.classList.add("deleteButton");
		planDelete.innerHTML = "Delete";
		planDelete.addEventListener("click", function(){
			this.parentNode.parentNode.remove();
		});
		newInfo.appendChild(planDelete);
		
		newDestination.appendChild(newInfo);
		document.getElementById("planner").appendChild(newDestination);
		document.getElementById("error").innerHTML = "";
	} catch (error){
		console.log("Error: ", error);
	}
	
}

//If two destinations are set for the same date, this function sorts them in alphabetical order
const moveEntry = async function() {
    
    await createPlan();
    
    try{
        let entries = document.querySelectorAll(".entry");
        let newEntry = document.querySelector(".newEntry");
        let newEntryID = newEntry.id.toString();
        let newEntryName = newEntry.getAttribute("name");
        if(entries.length > 0){
            for(const entry of entries){
                let entryID = entry.id.toString();
                let entryName = entry.getAttribute("name");
                if(newEntryID < entryID){
                    entry.parentNode.insertBefore(newEntry, entry);
                    break;
                } else if(newEntryID == entryID) {
                    if(newEntryName.localeCompare(entryName) == -1){
                        entry.parentNode.insertBefore(newEntry, entry);
                        break;
                    } else if (newEntryName.localeCompare(entryName) == 0) {
                        entry.parentNode.insertBefore(newEntry, entry)
                        break;
                    } else if (newEntryName.localeCompare(entryName) == 1) {
                    }
                } else if (newEntryID > entryID) {
                    console.log("newEntry has a higher date than entry");
                }
            }
        } 
        newEntry.classList.add("entry");
        newEntry.classList.remove("newEntry");
    } catch (error){
        console.log("Error: " + error);
    }
}

module.exports =  { weatherAtDestination, getDestinationInfo, getCurrentWeatherInfo, getForecastWeatherInfo, postWeatherInfo, createPlan, moveEntry, apps}
