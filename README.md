## General information
Web application for recording and displaying working hours relating to warranty cases that have occurred in the customer support area.

## Build status
master <br/>
[![Build Status](https://travis-ci.com/ibwgr/warranty-tracker.svg?branch=master)](https://travis-ci.com/ibwgr/warranty-tracker) <br/>
develop <br/>
[![Build Status](https://travis-ci.com/ibwgr/warranty-tracker.svg?branch=develop)](https://travis-ci.com/ibwgr/warranty-tracker) <br/>

## Installation
### MariaDB
#### Set up MariaDB for local development and testing using Docker:
The docker compose uses by default port 3333 for the mariaDB database. Ensure that this port is not occupied by another application prior to running this command.
1. install docker on your host
2. start docker
3. copy the dev.env file and save it as .env
4. fire up your terminal and go to the root directory of the project
5. run the following docker command: `docker-compose up`

#### Set up MariaDB for production:
1. install mariaDB
2. create database with the warrantyDB.sql file - Path: warranty-tracker/database/warrantyDB.sql 

### Node.js
1. install npm (shipped with node, nvm recommended for node install)
2. install all dependencies: `npm install`

## Dependencies
- body-parser - Node.js body parsing middleware
- express - Node.js web-framework
- mariadb - MariaDB and MySQL client for Node.js
- flatpickr - Used as date picker

## Usage
1. Build & serve web application: `npm run start`
   
   Build & serve web application in development mode: `npm run dev`

2. Open browser with URL: http://localhost:3000

## Unit & Integration tests
- run all unit and integration tests : `npm run test`
<br></br>
- run all unit tests: `npm run test:unit`
- run all unit tests for server side modules: `npm run test:unit:app`
- run all unit tests for client side modules: `npm run test:unit:view`
<br></br>
- run all integration tests: `npm run test:e2e`

## IDE
Developed with IntelliJ

