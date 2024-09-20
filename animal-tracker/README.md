# Animal Tracker

A wildlife application for tracking species, sightings, and individual animals. 

## Features
- **Species List**: Displays a list of tracked species with their details.
- **Sightings List**: Displays a list of sightings with details like location, health status, and time.
- **Species Form**: Add new species to the tracker.
- **Sightings Form**: Record new sightings of individual animals.
- **Individuals Form**: Add new individual animals to track.

## Technologies
- **Frontend**: React Vite
- **Backend**: Node.js, Express
- **Database**: PostgresSQL
- **Testing**: Vitest, React Testing Library (RTL), Jest

#### Once you have successfully setup this template and initial database, the view will look like this:![localhost_5173_](https://github.com/user-attachments/assets/7f48c270-22f1-4558-b5e8-e9c841b59f9d)


## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** [Download and install Node.js](https://nodejs.org/)
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

## Installation

Follow these steps to run the app locally:

1. **Clone the repository**:
    ```bash
    git clone git@github.com:jsnorek/techtonica-assignments.git
    cd animal-tracker
    ```
2. To clean your folder from the owner's git, run the command `rm -rf .git` inside the folder <NAMENEWDIRECTORY>. Then re-initialize as the owner with `git init`.

3. **Install dependencies**:

    Navigate to both the server and client directories and install dependencies:

    ```bash
    # In the server directory 
    cd server
    npm install
    
    # In the client directory
    cd client
    npm install
    ```
4. To setup the database:
* In a different terminal window go to the psql terminal with the comand `psql` and create a newdatabase with `createdb animal_tracker_db`
* Use the provided db.sql file to set up your database schema with the command `psql -d animal_tracker_db -f path/to/db.sql`
* Inside your server directory create a `.env` file and copy there the values that are in `.envexample`

## Running the App

To run the program in your localhost browser, nagivate to your server folder (`cd server`) and run the command `node server.js` to run your server. 
The client should now be running on `http://localhost:5173`.

Then navigate to your client folder (`cd client`) and run the command `npm run dev` and click on the link to view the application in browser.
The server should now be running on `http://localhost:8080`.

## Testing

To run debugging tests on your forms, open a new terminal and navigate into your client folder (`cd client`) and run the command `npm run test`
To run debugging tests on your API endpoints, open a new terminal and navigate into your server folder (`cd server`) and run the command `npm test server.test.js`

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## Stretch Goals

- **Add delete button to each list item**
- **Add a navigation and search bar to filter through list items**
