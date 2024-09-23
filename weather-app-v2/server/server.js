import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db-connection.js';

const { query } = db;

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api key
const api_key = process.env.api_key

//test route
// app.get("/", (req, res) => {
//     res.json("Hello to your weather app server!");
// });

app.get("/", async (req, res) => {
    console.log("root path triggered");
    const defaultLocation = "Seattle";
    const url = `http://pro.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Imperial&APPID=${api_key}`;
    const rawData = await fetch(url);
    const weatherData = await rawData.json();

  res.send(weatherData)
});

app.get('/location/:location', async (req, res) => {
    //search variable
    const location = req.params.location
    const url = `http://pro.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&APPID=${api_key}`;
    const rawData = await fetch(url)
    const locationData = await rawData.json()
  
    res.send(locationData)
  });

app.get('/users', async (req, res) => {
    try {
        const { rows: users } = await db.query("SELECT * FROM users");
        res.send(users);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

app.get('/user/password', async (req, res) => {
    try {
        const { rows: users } = await db.query(`
            SELECT users.*, user_passwords.password_hash
            FROM users
            JOIN user_passwords ON users.user_id = user_passwords.user_id
        `);
        res.send(users);
    } catch (e) {
        console.log('error fetching users and passwords:', e);
        return res.status(400).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});

export default app;