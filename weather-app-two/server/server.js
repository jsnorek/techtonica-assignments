// server/index.js

import express, { raw } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Set the port that you want the server to run on
const PORT = process.env.PORT || 5003;

//middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//api key
const api_key = process.env.api_key

//creates an endpoint for the route /api
app.get('/', async (req, res) => {
    console.log("root path triggered");
    const defaultLocation = "Sonoma"
    const url = `http://pro.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Imperial&APPID=${api_key}`
    const rawData = await fetch(url)
    const weatherData = await rawData.json()

  res.send(weatherData)
});

app.get('/location/:location', async (req, res) => {
  //search variable
  const location = req.params.location
  const url = `http://pro.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&APPID=${api_key}`;
  const rawData = await fetch(url)
  const locationData = await rawData.json()

  res.send(locationData)
})

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});