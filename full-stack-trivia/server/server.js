import express, { json } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5005;

// Middleware
app.use(cors());
app.use(json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sample route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/questions', async (req, res) => {
    console.log("testing root path triggered");
    const url = 'https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=boolean';
    const rawData = await fetch(url)
    const questionData = await rawData.json()
    console.log(questionData);
    res.send(questionData)
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});