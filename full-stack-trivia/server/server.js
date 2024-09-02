import express, { json } from 'express';
import cors from 'cors';

const app = express();
const port = 5005;

// Middleware
app.use(cors());
app.use(json());

// Sample route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});