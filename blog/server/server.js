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
// const api_key = process.env.api_key

// test route
app.get("/", (req, res) => {
    res.json("Hello to your blog server!");
});

app.get('/reviews', async (req, res) => {
    try {
        const { rows: reviews } = await db.query(`
            SELECT reviews.*, games.title
            FROM reviews
            JOIN games ON reviews.game_id = games.game_id
            `);
        res.send(reviews);
    } catch (e) {
        console.log('error getting reviews', e);
        return res.status(400).json({ error: e.message });
    }
});

app.get('/game-details/:game_id', async (req, res) => {
    const game_id = req.params.game_id;
    try {
        const result = await db.query(`
            SELECT games.*, reviews.rating
            FROM games
            JOIN reviews ON games.game_id = reviews.game_id
            WHERE games.game_id = $1
            `, [game_id]);
        res.send(result.rows);
    } catch (e) {
        console.log('error getting game info', e);
        return res.status(400).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});
export default app;