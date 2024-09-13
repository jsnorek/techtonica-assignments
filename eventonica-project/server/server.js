//This is the minimal express server. 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db/db-connection.js'); 

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica 2023 H2 to your Server for Eventonica");
  });

// create the get request for events in the endpoint '/api/events'
app.get("/api/events", async (req, res) => {
  try {
    const { rows: events } = await db.query("SELECT * FROM events");
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const { rows: events } = await db.query(
      "SELECT * FROM events WHERE title ILIKE $1 OR location ILIKE $1 OR ILIKE $1 eventtime",
      [`%${searchTerm}%`]
    );
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/events", async (req, res) => {
  try {
    const newEvent = {
      title: req.body.title,
      location: req.body.location,
      eventtime: req.body.eventtime
    };
    //console.log([newEvent.title, newEvent.location, newEvent.eventtime]);
    const result = await db.query(
      "INSERT INTO events(title, location, eventtime) VALUES($1, $2, $3) RETURNING *",
      [newEvent.title, newEvent.location, newEvent.eventtime]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for events
app.delete("/api/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await db.query("DELETE FROM events WHERE id=$1", [eventId]);
    console.log("From the delete request-url", eventId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// //A put request - Update an event
app.put("/api/events/:eventId", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the event to be updated
  const eventId = req.params.eventId;
  const updatedEvent = {
    // id: req.body.id,
    title: req.body.title,
    location: req.body.location,
    eventtime: req.body.eventtime
  };
  console.log("In the server from the url - the event id", eventId);
  console.log(
    "In the server, from the react - the event to be edited",
    updatedEvent
  );
  const query = `UPDATE events SET title=$1, location=$2, eventtime=$3 WHERE id=${eventId} RETURNING *`;
  const values = [
    updatedEvent.title,
    updatedEvent.location,
    updatedEvent.eventtime
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

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});