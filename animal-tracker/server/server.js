import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import db from './db/db-connection.js';


const { query } = db;

dotenv.config();

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello to your animal sighting server");
});

// create the get request for events in the endpoint '/api/events'
app.get("/api/species", async (req, res) => {
    try {
        const { rows: species } = await db.query("SELECT * FROM species");
        res.send(species);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});