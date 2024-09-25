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

// app.get("/contacts/:contact_id", async (req, res) => {
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

app.get("/contacts/contact_details/:contact_id", async (req, res) => {
    const contact_id = req.params.contact_id;
    try {
        const result = await db.query(`
            SELECT contact_details.*, contacts.name
            FROM contact_details
            JOIN contacts ON contact_details.contact_id = contacts.contact_id
            WHERE contact_details.contact_id = $1
        `, [contact_id]);
        res.send(result.rows);
    } catch(e) {
        console.log('error fetching contact details', e);
        return res.status(400).json({ error: e.message });
    }
});

app.post("/contacts", async (req, res) => {
    try {
        const newContact = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            notes: req.body.notes,
        };
        console.log([newContact.name, newContact.email, newContact.phone, newContact.notes]);
        const result = await db.query(
            "INSERT INTO contacts(name, email, phone, notes) VALUES($1, $2, $3, $4) RETURNING *",
            [newContact.name, newContact.email, newContact.phone, newContact.notes]
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (e) {
        console.log('error adding contact', e);
        return res.status(400).json({ error: e.message });
    }
});

app.put("/contacts/:contact_id", async (req, res) => {
    const contact_id = req.params.contact_id;
    const updatedContact = {
        name:req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        notes: req.body.notes,
    };
    console.log("in the server from the url - the contact id", contact_id);
    console.log("In the server from react - contact to be edited", updatedContact);
    const query = `
        UPDATE contacts
        SET name=$1, email=$2, phone=$3, notes=$4
        WHERE contact_id=$5 RETURNING *`;
    const values = [
        updatedContact.name,
        updatedContact.email,
        updatedContact.phone,
        updatedContact.notes,
        contact_id
    ];
    try {
        const updated = await db.query(query, values);
        console.log(updated.rows[0]);
        res.send(updated.rows[0]);
    } catch (e) {
        console.log('error editing contact', e);
        return res.status(400).json({ error: e.message });
    }
});

app.delete("/contacts/:contact_id", async (req, res) => {
    try {
        const contact_id = req.params.contact_id;
        await db.query("DELETE FROM contacts WHERE contact_id=$1", [contact_id]);
        console.log("From the delete request-url", contact_id);
        res.status(200).end();
    } catch (e) {
        console.log('error deleting contact', e);
        return res.status(400).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});
export default app;