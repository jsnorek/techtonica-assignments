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

//adding to the species table
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
        const insertedSighting = result.rows[0];
        const fullDetailStightings = await db.query (
            `SELECT sightings.*, individuals.nickname, species.common_name 
            FROM sightings 
            JOIN individuals ON sightings.individual_id = individuals.id
            JOIN species ON individuals.species_id = species.id
            WHERE sightings.id = $1
            `, [insertedSighting.id]);
        // console.log(result.rows[0]);
        res.json(fullDetailStightings.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

//adding to the individuals table
app.post("/api/individuals", async (req, res) => {
    try {
        const newIndividual = {
            nickname: req.body.nickname,
            species_id: req.body.species_id
        };
        console.log([newIndividual.nickname, newIndividual.species_id]);
        const result = await db.query(
            "INSERT INTO individuals(nickname, species_id) VALUES($1, $2) RETURNING *",
            [newIndividual.nickname, newIndividual.species_id]
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

//update a species row
app.put("/api/species/:species_id", async (req, res) => {
    const species_id = req.params.species_id;
    const updatedSpecies = {
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        estimated_population: req.body.estimated_population,
        conservation_status: req.body.conservation_status,
    };
    console.log("In the server from the url - the species id", species_id);
    console.log( "In the server, from the react - the species to be edited", updatedSpecies);
    const query = `
        UPDATE species 
        SET common_name=$1, scientific_name=$2, estimated_population=$3, conservation_status=$4 
        WHERE id=$5 RETURNING *`; //Instead of directly interpolating species_id into the SQL query (WHERE id=${species_id}), use a placeholder ($5) and pass the species_id as the last value in the values array. This helps prevent SQL injection attacks and ensures the query is executed safely.
    const values = [
        updatedSpecies.common_name,
        updatedSpecies.scientific_name,
        updatedSpecies.estimated_population,
        updatedSpecies.conservation_status,
        species_id
    ];
    try {
        const updated = await db.query(query, values);
        console.log(updated.rows[0]);
        res.send(updated.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

//delete a species row
app.delete("/api/species/:species_id", async (req, res) => {
    try {
        const species_id = req.params.species_id;
        await db.query("DELETE FROM species WHERE id=$1", [species_id]);
        console.log("From the delete request-url", species_id);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});


app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});

export default app;