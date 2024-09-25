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

app.get("/contacts", async (req, res) => {
    try {
        const { rows: contacts } = await db.query("SELECT * FROM contacts");
        res.send(contacts);
    } catch (e) {
        console.log('error getting contacts', e)
        return res.status(400).json({ error: message.e });
    }
});

// app.get("/contacts/:contact-id", async (req, res) => {
//     const contact_id = req.params.contact_id;
//     try {
//         const { rows: contact_details } = await db.query(`
//             SELECT contact_details*, contacts.name
//             FROM contact_details
//             JOIN contacts ON contact_details.contact_id = contacts.contact_id
//             WHERE contact_details.contact_id = $1
//         `, [contact_id]);
//         res.send(contact_details);
//     } catch(e) {
//         console.log('error fetching contact details', e);
//         return res.status(400).json({ error: message.e });
//     }
// });

// app.get("/contacts/contact_details/:contact-id", async (req, res) => {
//     const contact_id = req.params.contact_id;
//     try {
//         const result = await db.query(`
//             SELECT contact_details*, contacts.name
//             FROM contact_details
//             JOIN contacts ON contact_details.contact_id = contacts.contact_id
//             WHERE contact_details.contact_id = $1
//         `, [contact_id]);
//         res.send(result.rows);
//     } catch(e) {
//         console.log('error fetching contact details', e);
//         return res.status(400).json({ error: message.e });
//     }
// });

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});
export default app;