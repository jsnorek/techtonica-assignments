# Blog App - Game Reviews
A blog application for displaying video game reviews listed in the database. Also utilizes OpenAI to summarize review text. 

## Features
- **Reviews List**: Displays a list of reviews with basic details including reviewer name, game, rating and review.
- **Game Details**: Button click that opens specific game details.
- **Review Form**: Add new game reviews to the database with a dropdown choice for games that are already in the database.
- **Delete**: Button to delete current reviews.
- **OpenAI Summarization**: Incorporates OpenAI API to summarize review text on button click.

## Technologies
- **Frontend**: React Vite
- **Backend**: Node.js, Express
- **Database**: PostgresSQL
- **Testing**: Vitest, React Testing Library (RTL), Jest

#### Once you have successfully setup this template and initial database, the view will look like this:
![ScreenRecording2024-10-04at9 26 26AM-ezgif com-optimize](https://github.com/user-attachments/assets/66f555c0-df83-4a8b-862f-65fbd9f33f1b)


## API Usage
This blog review app uses the OpenAI API to take in review text and create a summary. You can sign up for an account to get an API key and view API documentation here: https://platform.openai.com/docs/api-reference/introduction

An account is necessary, and you may need to purchase additional credits to run the API.

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:
- **Node.js** [Download and install Node.js](https://nodejs.org/)
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

## Installation
Follow these steps to run the app locally:
1. **Clone the repository**:
    ```bash
    git clone git@github.com:jsnorek/techtonica-assignments.git
    cd blog
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
* In a different terminal window go to the psql terminal with the comand `psql` and create a newdatabase with `createdb blogs`
* Use the provided db.sql file to set up your database schema with the command `psql -d blogs -f path/to/db.sql`
* Inside your server directory create a `.env` file and copy there the values that are in `.envexample` making sure to change them to your own information. Be sure to update the OPENAI_API_KEY in this file to your API key.

## Running the App
To run the program in your localhost browser, navigate to your server folder (`cd server`) and run the command `node server.js` to run your server. 
The client should now be running on `http://localhost:5173`.
Then navigate to your client folder (`cd client`) and run the command `npm run dev` and click on the link to view the application in browser.
The server should now be running on `http://localhost:8080`.

## Testing
To run debugging tests on your components, open a new terminal and navigate into your client folder (`cd client`) and run the command `npm run test`

## Edge Cases
- **Add Contact Form Error Handling**: This app displays a timed error message for if the user does not enter a name (required) when creating a new contact.
- **Database Error Handling**: Postman was used to make sure endpoints worked correctly 

## Database Schema
The database schema includes tables for reviews and for game_details that have game_id number as a foreign key:
-**reviews**: Stores review_id, game_id, reviewer_name, rating, review_text, review_date
-**game_details**: Stores game_id, title, genre, release_date, developer, platform, created_at

## Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## Stretch Goals
- **Edit button pops up new window with editing options**
- **Form allows you to choose to add a new game to the database if the game you want to review is not listed**
- **Search bar that allows you to search by game, genre, or platform**
