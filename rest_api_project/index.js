import express from 'express';

import cors from 'cors';
import albums from './albums.js';

const app = express();
const PORT = 5001;

//configuring cors middleware
app.use(cors());

//create route for root directory - listens for GET request to the root path of the API and sends a response with the message
app.get('/', (req, res) => {
    //res.send("Hello World!")
    res.json("hello");
});

//create route for GET
app.get('/albums', (req, res) => {
    res.json(albums)
})



app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));