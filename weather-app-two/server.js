// server/index.js

import express from 'express';

const app = express();

//Set the port that you want the server to run on
const PORT = process.env.PORT || 5003;

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.send('Hello World')
//   res.json({ message: 'Hello from ExpressJS' });
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});