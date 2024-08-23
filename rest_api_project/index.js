import express from 'express';
import cors from 'cors';
import albums from './albums.js';
import pkg from 'pg';


const app = express();
const PORT = 5001;

//configuring cors middleware
app.use(cors());
//In your Express app, make sure you’re using the express.json() middleware to parse incoming JSON requests.
app.use(express.json());


//database connection setup
const { Pool } = pkg;

const db = new Pool({
  user: 'juliana',
  host: 'localhost',
  database: 'tsalbums',
  password: 'postgres',
  port: 5432,
});

//create route for root directory - listens for GET request to the root path of the API and sends a response with the message
app.get('/', (req, res) => {
    //res.send("Hello World!")
    res.json("test message hello");
});

app.get('/albums', async (req, res) => {
    try {
        //fetch albums from database
        const query = 'SELECT * FROM album';
        const result = await db.query(query);
         //send the album data as a JSON response
         res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching albums:', error);
        res.status(500).send('Internal server error');
    }
});


//create route for GET
// app.get('/albums', async (req, res) => {
//     // for pulling hardcoded data
//     res.json(albums)
    //for pulling from database
    // const database = await [something].connect();
    // const albumTable = await database.query('SELECT * FROM album');
    // res.json(albumTable.rows);
    // database.release
    // console.log('GET QUERY OF ALBUS IS WORKING ON BACKEND');
// })

// app.post('/albums', (req, res) => {
//     const newAlbum = req.body;
//     albums.push(newAlbum)
//     res.send({message: 'New album added'})
// })

app.post('/albums', async (req, res) => {
    try {
        const { title, number, tracks, artist, date } = req.body;
        const query = 'INSERT INTO album (title, number, tracks, artist, date) VALUES ($1, $2, $3, $4, $5)';
        //console.log(`this is the query: ${query}`);
        const response = await db.query(query, [title, number, tracks, artist, date]);
        //res.status(201).json({ message: 'Album created successfully' albums: [const created in line 70]});
        const newAlbumQuery = `SELECT * FROM album WHERE number=${number}`;
        const albumResponse = await db.query(newAlbumQuery);
        res.status(201).json({ message: 'Album created successfully', albumResponse });
    } catch (error) {
        //res.status(500).json({ error: 'Error creating item' });
        console.error(error);
    }
});

app.put('/albums/:number', async (req, res) => {
    try {
        const { title, tracks, artist, date } = req.body;
        const albumNumber = req.params.number;
        //const updateQuery = 'UPDATE album SET title = $1, tracks = $2, artist = $3, date = $4 WHERE number = $5';
        //const albumResponse = await db.query(updateQuery, [title, tracks, artist, date, albumNumber]);
        const updateQuery = `UPDATE album SET title = $1, tracks = $2, artist = $3, date = $4 WHERE number = ${albumNumber}`;
        const albumResponse = await db.query(updateQuery, [title, tracks, artist, date]);
        res.status(200).json({ message: `Album with number ${albumNumber} updated successfully`, albumResponse});
    } catch (error) {
        res.status(500).json({ error: 'Error updating album'});
    }
});
        



app.delete('/albums/:number', async (req, res) => {
    try {
        const albumNumber = req.params.number;
        const deleteQuery = `DELETE FROM album WHERE number=${albumNumber}`;
        await db.query(deleteQuery);
        res.status(200).json({ message: 'Album deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item'});
    }
});
//not sure if this is accurate
// app.post ('/albums', (req, res) => {
//     console.log("Making a new album...");
    
//     const data = {
//         title: req.body.title,
//         number: req.body.title,
//     };
//     console.log(data);
//     res.send(data);
// })



app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));