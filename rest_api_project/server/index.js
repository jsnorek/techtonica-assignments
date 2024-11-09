import express from 'express';
import cors from 'cors';
import albums from './albums.js';
import pkg from 'pg';


const app = express();
const PORT = 5002;

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

// Create route for root directory - listens for GET request to the root path of the API and sends a response with the message
app.get('/', (req, res) => {
    res.json("test message hello");
});

// Fetch all album data
app.get('/albums', async (req, res) => {
    try {
        const query = 'SELECT * FROM album';
        const result = await db.query(query);
         res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching albums:', error);
        res.status(500).send('Internal server error');
    }
});

// Fetch albums based on specific artist
app.get('/albums/artist/:artist', async (req, res) => {
    try {
        const artist = req.params.artist;
        const query = 'SELECT * FROM album WHERE artist = $1';
        const result = await db.query(query, [artist]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `No albums found for artist ${artist}` });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching albums by artist:', error);
        res.status(500).send('Internal server error');
    }
});

// Create new album
app.post('/albums', async (req, res) => {
    try {
        const { title, number, tracks, artist, date } = req.body;
        const query = 'INSERT INTO album (title, number, tracks, artist, date) VALUES ($1, $2, $3, $4, $5)';
        await db.query(query, [title, number, tracks, artist, date]);
        const newAlbumQuery = `SELECT * FROM album WHERE number=${number}`;
        const albumResponse = await db.query(newAlbumQuery);
        res.status(201).json({ message: 'Album created successfully', albumResponse });
    } catch (error) {
        console.error(error);
    }
});

// Edit album based on album number
app.put('/albums/:number', async (req, res) => {
    try {
        const { title, tracks, artist, date } = req.body;
        const albumNumber = req.params.number;
        const updateQuery = `UPDATE album SET title = $1, tracks = $2, artist = $3, date = $4 WHERE number = ${albumNumber}`;
        const albumResponse = await db.query(updateQuery, [title, tracks, artist, date]);
        res.status(200).json({ message: `Album with number ${albumNumber} updated successfully`, albumResponse});
    } catch (error) {
        res.status(500).json({ error: 'Error updating album'});
    }
});
        
// Delete album based on album number
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

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));