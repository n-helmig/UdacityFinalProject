/**
* @jest-environment jsdom
*/

const allFunctions = require("../src/client/js/app");
const request = require("supertest");
    
describe("Getting the weather at input destination", () => { 
    test("Testing the weatherAtDestination() function", () => {
           expect(allFunctions.weatherAtDestination).toBeDefined();
})});

describe("Getting information from input destination", () => { 
    test("Testing the getDestinationInfo() function", () => {
           expect(allFunctions.getDestinationInfo).toBeDefined();
})});

describe("Get weather for input destination", () => { 
    test("Testing the getCurrentWeatherInfo() function", () => {
           expect(allFunctions.getCurrentWeatherInfo).toBeDefined();
})});

describe("Get weather forecast for input destination", () => { 
    test("Testing the getForecastWeatherInfo() function", () => {
           expect(allFunctions.getForecastWeatherInfo).toBeDefined();
})});

describe("Posting the weather information", () => { 
    test("Testing the postWeatherInfo() function", () => {
           expect(allFunctions.postWeatherInfo).toBeDefined();
})});

describe("Creating an element for the new location", () => { 
    test("Testing the createPlan() function", () => {
           expect(allFunctions.createPlan).toBeDefined();
})});

describe("Moving the newly created location depending on its date and name", () => { 
    test("Testing the moveEntry() function", () => {
           expect(allFunctions.moveEntry).toBeDefined();
})});
/* Uncomment this test to test the server
describe("Testing express server", () => {
  test("Testing express server", () => {
    return request(allFunctions.apps)
      .get("/")
  });
});*/