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

app.get('/games', async (req, res) => {
    try {
        const { rows: games } = await db.query(`SELECT * FROM games`);
        res.send(games);
    } catch (e) {
        console.log('error getting games list', error);
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

app.post('/reviews', async (req, res) => {
    try {
        const newReview = {
            reviewer_name: req.body.reviewer_name,
            game_id: req.body.game_id,
            rating: req.body.rating,
            review_text: req.body.review_text
        };
        console.log([newReview.reviewer_name, newReview.game_id, newReview.rating, newReview.review_text]);
        const result = await db.query(
            "INSERT INTO reviews(reviewer_name, game_id, rating, review_text) VALUES($1, $2, $3, $4) RETURNING *",
            [newReview.reviewer_name, newReview.game_id, newReview.rating, newReview.review_text]
        );
    } catch (e) {
        console.log('error adding review', e);
        return res.status(400).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});
export default app;