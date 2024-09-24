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
        console.log('error getting users', e);
        return res.status(400).json({ error: message.e });
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

// Fetch user by username
app.get('/users/username/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const { rows: user } = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user[0]); // Return the user details including the user_id
    } catch (e) {
        console.log('error fetching user by username:', e);
        return res.status(400).json({ error: e.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            favorite_city: req.body.favorite_city,
        };
        console.log([newUser.username, newUser.favorite_city]);
        const result = await db.query(
            "INSERT INTO users(username, favorite_city) VALUES($1, $2) RETURNING *",
            [newUser.username, newUser.favorite_city]
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (e) {
        console.log('error fechting updated users', e);
        return res.status(400).json({ error: e.message });
    }
});

app.put('/users/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const updatedUser = {
        username: req.body.username,
        favorite_city: req.body.favorite_city,
    };
    console.log("In the server from the url", user_id);
    console.log("In the server, from react - the user to be edited", updatedUser);
    const query = `
        UPDATE users 
        SET username=$1, favorite_city=$2
        WHERE user_id=$3 RETURNING *`;
    const values = [
        updatedUser.username,
        updatedUser.favorite_city,
        user_id
    ];
    try {
        const updated = await db.query(query, values);
        console.log(updated.rows[0]);
        res.send(updated.rows[0]);
    } catch (e) {
        console.log('error updating user', e);
        return res.status(400).json({ error: e.message });
    }
});

app.delete('/users/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        await db.query("DELETE FROM users WHERE user_id=$1", [user_id]);
        console.log("From the delete request-url", user_id);
        res.status(200).end();
    } catch (e) {
        console.log('error deleting user', e);
        return res.status(400).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});

export default app;