# VanHack Match

A place to connect employers with the best talents in the world. Like and see if you match some of the jobs abroad.

Employers are able to register accounts, and create jobs and check likes on their job offers.

Tech talents are able to register accounts, like and dislike job offers from a timeline.

When a talent likes a Job Offer, the employer is notified. If the employer likes his profile, it's a match. They both are able to schedule an interview and see each other identities.

## How to run

### Backend

You must prepare a .env file, based on .env.example.

To create a docker container with MongoDB locally (you must have docker installed):

`docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4`

To run it, run:

`docker run mongodb`

From `backend` directory, run `yarn` to install dependencies. 

To run the application, run `yarn start`. 

For development purposes, you can run `yarn dev` to serve a live server with nodemon. 

`npm` commands are also applicable.

### Frontend

From `frontend` directory, run `yarn` to install dependencies. To run the application, run `yarn start`. To build the application for production, ruin `yarn build`, it will create a static project inside `build` directory, on the frontend root.


## Technologies 

Application is based on Javascript, with Node.JS and React.JS. There is a server API, based on REST and a web app client, as UI.

* Backend
  * Node.JS - javascript platform
  * Express - http routing, requests and responses
  * MongoDB - noSQL database
  * Mongoose - framework abstraction for mongoDB (ODM)
  * Socket.io - websocket for real-time interactions with clients

* Frontend
  * React.JS - main reactive framework
  * Axios - http requests 
  * React-routing-dom - Routes for SPA
  * Socket.io-client - websocket for real-time interactions with server


This project was created based on RocketSeat's (https://rocketseat.com.br/) project, released on Omnistack week #8.

It's part of a Hackathon, called VanHackathon, organized by https://vanhack.com/.

Any doubts or contributions are very welcome.