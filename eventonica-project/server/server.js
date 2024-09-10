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


// app.get('/api/events', async (req, res) =>{

//     //real connection with the DB eventonica
//     try{
//         const { rows: events } = await db.query('SELECT * FROM events');
//         res.send(events);

//     } catch(error){
//         console.log(error);
//         return res.status(400).json({error});

    // }

//     //hardcode the events response for testing reasons. This call has one more event that the real DB 
//     try{
//         const events = [

//             {id: 1, title: 'Women in Tech Techtonica Panel', location: 'Overland Park Convention Center'},
//             {id: 2, title: 'Japanese Cultural Education', location: 'Seattle Convention Center'},
//             {id: 3, title: "Haven 90's Party Night Club", location: 'Hilton Hotel Kansas City'},
//             {id: 4, title: 'Comedy Night at the Station', location: 'SF Hilton Hotel'},
//             {id: 5, title: 'A Decadent Arts Experience', location: 'West Ridge Mall'},
//             {id: 6, title: 'Techtonica Classroom Course', location: 'Techtonica HQ'}
//           ];
//         res.json(events);

//     } catch(error){
//         console.log(error);
//     }   
    
// })

// // Route to add an event
// // app.post('/api/events', async (req, res) => {
// //   try {
// //     const { title, location, eventtime } = req.body;
// //     const query = 'INSERT INTO events (title, location, eventtime) VALUES ($1, $2, $3)';
// //     await _query(query, [title, location, eventtime]);
// //     const newEventQuery = `SELECT * FROM events WHERE id=${id}`;
// //     const eventResponse = await _query(newEventQuery);
// //     res.status(201).json({ message: 'Event created successfully', eventResponse });
// //   } catch (error) {
// //     console.error(error);
// //   }
// // });




// app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const path = require("path");
// const db = require("./db/db-connection.js");

// const app = express();
// const PORT = process.env.PORT || 8080;
// app.use(cors());
// app.use(express.json());

// // creates an endpoint for the route "/""
// app.get("/", (req, res) => {
//   res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
// });

// create the get request for events in the endpoint '/api/events'
app.get("/api/events", async (req, res) => {
  try {
    const { rows: events } = await db.query("SELECT * FROM events");
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

// // delete request for events
// app.delete("/api/events/:studentId", async (req, res) => {
//   try {
//     const studentId = req.params.studentId;
//     await db.query("DELETE FROM events WHERE id=$1", [studentId]);
//     console.log("From the delete request-url", studentId);
//     res.status(200).end();
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json({ e });
//   }
// });

// //A put request - Update a student
// app.put("/api/events/:studentId", async (req, res) => {
//   //console.log(req.params);
//   //This will be the id that I want to find in the DB - the student to be updated
//   const studentId = req.params.studentId;
//   const updatedStudent = {
//     id: req.body.id,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     iscurrent: req.body.is_current
//   };
//   console.log("In the server from the url - the student id", studentId);
//   console.log(
//     "In the server, from the react - the student to be edited",
//     updatedStudent
//   );
//   // UPDATE events SET lastname = "something" WHERE id="16";
//   const query = `UPDATE events SET firstname=$1, lastname=$2, is_current=$3 WHERE id=${studentId} RETURNING *`;
//   const values = [
//     updatedStudent.firstname,
//     updatedStudent.lastname,
//     updatedStudent.iscurrent
//   ];
//   try {
//     const updated = await db.query(query, values);
//     console.log(updated.rows[0]);
//     res.send(updated.rows[0]);
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json({ e });
//   }
// });

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});