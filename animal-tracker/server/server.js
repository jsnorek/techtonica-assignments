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

// create the get request for species in the endpoint '/api/species'
app.get("/api/species", async (req, res) => {
    try {
        const { rows: species } = await db.query("SELECT * FROM species");
        res.send(species);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});
// create the get request for sightings that includes the nickname in the individuals table
app.get("/api/sightings", async (req, res) => {
    try {
        const { rows: sightings } = await db.query(`
            SELECT sightings.*, individuals.nickname, species.common_name 
            FROM sightings 
            JOIN individuals ON sightings.individual_id = individuals.id
            JOIN species ON individuals.species_id = species.id
        `);
        res.send(sightings);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

app.post("/api/species", async (req, res) => {
    try {
        const newSpecies = {
            common_name: req.body.common_name,
            scientific_name: req.body.scientific_name,
            estimated_population: req.body.estimated_population,
            conservation_status: req.body.conservation_status,
        };
        console.log([newSpecies.common_name, newSpecies.scientific_name, newSpecies.estimated_population, newSpecies.conservation_status]);
        const result = await db.query(
            "INSERT INTO species(common_name, scientific_name, estimated_population, conservation_status) VALUES($1, $2, $3, $4) RETURNING *",
            [newSpecies.common_name, newSpecies.scientific_name, newSpecies.estimated_population, newSpecies.conservation_status]
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

app.post("/api/sightings", async (req, res) => {
    try {
        const newSighting = {
            sighting_time: req.body.sighting_time,
            individual_id: req.body.individual_id,
            location: req.body.location,
            healthy: req.body.healthy,
            sighter_email: req.body.sighter_email
        };
        console.log([newSighting.sighting_time, newSighting.individual_id, newSighting.location, newSighting.healthy, newSighting.sighter_email]);
        const result = await db.query(
            "INSERT INTO sightings(sighting_time, individual_id, location, healthy, sighter_email) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [newSighting.sighting_time, newSighting.individual_id, newSighting.location, newSighting.healthy, newSighting.sighter_email]
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});



app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});