import request from "supertest";
import app from "../server.js";
import { Client } from "pg";
import axios from 'axios';
import db from "../db/db-connection.js";

// Mock the library
jest.mock('axios');

//set up the test databse before running any tests that matches species database
//wrapped in beforeAll so it runs once before all the tests in this file to set up necessary database tables if they don't already exist
beforeAll(async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS species (
    id SERIAL PRIMARY KEY,
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    estimated_population INT, 
    conservation_status VARCHAR(255)
    );
  `);
});

//clean up the test database after running all tests
//Jest lifecycle method that runs once after all tests have been executed. It cleans up the database and closes any open database connections after all the tests run
//ensures no residual data or schema remain after tests are finished
afterAll(async () => {
  await db.query('DROP TABLE IF EXISTS species'); //drops species table from database
  db.end(); // close the database connection
});
// Truncate tables before each test to ensure isolation
//another lifecycle method but it runs before each test in the file
//resets the state of the database to a clean state before each test so tests don't interfere with each other
beforeEach(async () => {
  await db.query("TRUNCATE TABLE species RESTART IDENTITY CASCADE"); //trunicate resets species table by removing all rows. restart identity resets the auto-incrementing primary key of the table back to starting value. cascade ensures any related foreign keys are also removed
});


test("GET /api/species - fetches species data successfully", async () => {
  //insert a species record to fetch 
  await db.query(`
    INSERT INTO species (common_name, scientific_name, estimated_population, conservation_status)
    VALUES ('Wolf', 'La wolf', 1000, 'EN');
    `);
    //use supertest to send GET request to /api/species and we expect a 200 OK status
  const response = await request(app)
    .get("/api/species")
      expect(200);
  expect(response.body.length).toBeGreaterThan(0); //checks the response has at least one species (the one we inserted)
  expect(response.body[0]).toHaveProperty("common_name", "Wolf");
  expect(response.body[0]).toHaveProperty("scientific_name", "La wolf");
  expect(response.body[0]).toHaveProperty("estimated_population", 1000);
  expect(response.body[0]).toHaveProperty("conservation_status", "EN");
});

test("POST /api/species - creates new species data", async () => {
  //define new data for the species we're adding
  const newSpecies = {
    common_name: "Wolf",
    scientific_name: "La wolf",
    estimated_population: 2000,
    conservation_status: "CR"
  };
    //use supertest to send POST request to /api/species and we expect a 200 OK status
  const response = await request(app)
    .post("/api/species")
    .send(newSpecies)
    .expect(200);
    //checking the response has the same data as the newSpecies we posted
  expect(response.body.common_name).toBe(newSpecies.common_name);
  expect(response.body.scientific_name).toBe(newSpecies.scientific_name);
  expect(response.body.estimated_population).toBe(newSpecies.estimated_population);
  expect(response.body.conservation_status).toBe(newSpecies.conservation_status);
});

test("PUT /api/species/:species_id - updates an existing species", async () => {
  //insert a species record into database and return it so we have the ID of the species to update
  const { rows } = await db.query(`
    INSERT INTO species (common_name, scientific_name, estimated_population, conservation_status)
    VALUES ('Wolves', 'La wolf', 1000, 'CR')
    RETURNING *;
  `);
//create updated species data
  const updatedSpecies = {
    common_name: 'Wolf',
    scientific_name: 'El wolf',
    estimated_population: 1500,
    conservation_status: 'EN'
  };
//use supertest to send PUT request to update existing data and update with new data and we expect a 200 OK status
  const response = await request(app)
  //using id from data from the first row
  .put(`/api/species/${rows[0].id}`)
    .send(updatedSpecies)
    .expect(200);
  expect(response.body.common_name).toBe(updatedSpecies.common_name);
  expect(response.body.scientific_name).toBe(updatedSpecies.scientific_name);
  expect(response.body.estimated_population).toBe(updatedSpecies.estimated_population);
  expect(response.body.conservation_status).toBe(updatedSpecies.conservation_status);
})

test("DELETE /api/species/:species_id - deletes a species from the database", async () => {
  //insert species data to delete
  const { rows } = await db.query(`
    INSERT INTO species (common_name, scientific_name, estimated_population, conservation_status)
    VALUES ('Wolf', 'La wolf', 1000, 'EN')
    RETURNING *;
  `);
  await request(app)
    .delete(`/api/species/${rows[0].id}`)
    .expect(200);

  const response = await db.query(`SELECT * FROM species WHERE id = $1`, [rows[0].id]);
  //expect length to be 0 because there should be no rows of data after deletion
  expect(response.rows.length).toBe(0);
});

// this works but doesn't use mock database
// test('fetches species data successfully', async () => {
//   // Mock the response data
//   const mockResponse = { data: { message: 'Success!' } };
//   axios.get.mockResolvedValue(mockResponse);

//   // Call the function that makes the request
//   const response = await axios.get("/api/species");
//   // console.log('response date', response);

//   // Make assertions on the response
//   expect(response).toEqual(mockResponse);

// });

