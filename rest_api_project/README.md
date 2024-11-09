# Rest API Project

This is a REST API project that manages album data. This project uses CRUD operations on a database of music albums, such as fetching data, creating new albums, updating album information, and deleting records.

## Installation

Follow these steps to open this REST API page on your local machine:

Open your terminal

Change directory to where you want to store the page

```
~/ cd new/Directory/on/your/machine
```

Clone this repository using the HTTPS URL

```
git clone https://github.com/jsnorek/techtonica-assignments.git
```

Change directory into the REST API page directory

```
cd ../REST_API_PROJECT
```

Connect to PostgreSQL:

```
psql -U your_db_username
```

Create database: 

```
CREATE DATABASE tsalbums
```

Connect to database:

```
\c tsalbums
```

Create table for database:

```
CREATE TABLE album (
number SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
tracks INT,
artist VARCHAR(255),
release_date DATE
);
```

After database creation,
Change directory into the server

```
cd server
```

Run the server

```
node index.js
```

### Demo
*Can use Postman to check endpoints
<img width="589" alt="Screenshot 2024-11-08 at 6 44 28 PM" src="https://github.com/user-attachments/assets/44fc012d-8ada-4f88-9844-5d556daa1b19">

## Technologies
- **Express.js**: Web framework for creating the RESTful API.
- **PostgreSQL**: Relational database for storing album data
- **pg**: PostgreSQL client


