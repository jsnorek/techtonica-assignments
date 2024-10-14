# Weather App

A weather application using OpenWeatherMap API for displaying the current weather based on user search. 

## Features
- **Weather Data**: Displays the current weather information based on a specific location.
- **Search Bar**: Allows the user to search for weather for a specific city.
- **Save Favorite**: Requires user to enter their username in order to save the currently displayed city as their favorite. This city is then added to the database.
- **Update Favorite**: Popup that allows user to type in a new city and save the location as their favorite city in the database without changing the city currently being displayed.

## Technologies
- **Frontend**: React Vite
- **Backend**: Node.js, Express
- **Database**: PostgresSQL
- **Testing**: Vitest, React Testing Library (RTL), Jest

#### Once you have successfully setup this template and initial database, the view will look like this:
![ezgif com-optimize (1)](https://github.com/user-attachments/assets/2ae7d275-851c-4caa-970b-a4c83bae4126)


## API Usage

This weather app uses the OpenWeatherMap API to pull the current weather. The OpenWeatherMap API needed for this project is free to use if you sign up for a student account.

https://openweathermap.org/api

Registration for an API key is neccessary. To do this, you must sign up for an account and provide student details. Once approved, log in and you can find you key under "My API keys".

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
* In a different terminal window go to the psql terminal with the comand `psql` and create a newdatabase with `createdb weather_app`
* Use the provided db.sql file to set up your database schema with the command `psql -d weather_app -f path/to/db.sql`
* Inside your server directory create a `.env` file and copy there the values that are in `.envexample` making sure to change them to your own information. Be sure to update the api_key to your API key.

## Running the App

To run the program in your localhost browser, nagivate to your server folder (`cd server`) and run the command `node server.js` to run your server. 
The client should now be running on `http://localhost:5173`.

Then navigate to your client folder (`cd client`) and run the command `npm run dev` and click on the link to view the application in browser.
The server should now be running on `http://localhost:8080`.

## Testing

To run debugging tests on your forms, open a new terminal and navigate into your client folder (`cd client`) and run the command `npm run test`

## Edge Cases

- **API Error Handling**: This app displays a timed error message for API errors based on API documentation and which error code is occurring.
- **Database Error Handling**: Postman was used to make sure endpoints worked correctly 

## Database Schema

The database schema includes tables for users and for user_passwords that have user_id number as a foreign key:

-**users**: Stores user_id, username, favorite_city
-**user_passwords**: Stores password_id, user_id, password_hash, created_at

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## Stretch Goals

- **Add a full login with user entering username and password**
- **Upon login, weather app displays the user's current favorite city data that updates as the user changes their favorite city but prompts logging in if no user is entered**
- **Add new user form**

