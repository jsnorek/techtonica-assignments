// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//     // user: process.env.DB_USER,
//     // database: process.env.DB_NAME,
//     // port: process.env.DB_PORT,
//     user: 'juliana',
//     database: 'animal_tracker',
//     port: 8080
// });

// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
// });

// export default {
//     query: (text, params) => pool.query(text, params),
// };

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// import { Pool } from 'pg';
const db = new Pool({
    connectionString: process.env.DB_URL
  });

  export default db;