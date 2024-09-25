import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db/db-connection.js';

const { query } = db;

dotenv.config();

const app = express();
const PORT = 8005;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// test route
app.get("/", (req, res) => {
    res.json("Hello to your client app server!");
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});
export default app;