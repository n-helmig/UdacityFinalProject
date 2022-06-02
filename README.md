# Udacity Final Project

## Overview
This website allows the user to log trips in a planner and see what the weather is like at said location.

## Current Status
Complete.

## How to run
In your command prompt/terminal, go to where the file is location and then use "npm i" to install all dependencies.

Create a file called .env and save each API key in the file. For the variable names check the "apiUrls.js" file.

In order to start the website, use "npm run build" and then "npm run start".

## How to run test

For running normal tests, use "npm run test" in the terminal. This will check for all main functions and if they're working.

If you would like to test the express server, go to server.js and follow the instructions in the comments. Head to /src/client/js/app.js and rename the file to something other than "app.js". Once you do this, change the name of "appServer.js" to "app.js". Then head to /src/client/index.js and follow the instructions in the comments  Finally go to app.spec.js and uncomment the last test.

Once you do that run "npm run test" in the terminal and the server test will run.

This needs to be done as there are conflicts with require and import that are caused when the server is run from the client.