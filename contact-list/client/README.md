# Contact List

A contact application for displaying contacts listed in the database. 

## Features
- **Contacts List**: Displays a list of contacts with their basic details.
- **Contact Details**: Button click that opens specific contact details.
- **Contact Form**: Add new contacts to the database.
- **Edit**: Button to edit current contacts.
- **Delete**: Button to delete current contacts.

## Technologies
- **Frontend**: React Vite
- **Backend**: Node.js, Express
- **Database**: PostgresSQL
- **Testing**: Vitest, React Testing Library (RTL), Jest

#### Once you have successfully setup this template and initial database, the view will look like this:


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
* In a different terminal window go to the psql terminal with the comand `psql` and create a newdatabase with `createdb contacts_app`
* Use the provided db.sql file to set up your database schema with the command `psql -d contacts_app -f path/to/db.sql`
* Inside your server directory create a `.env` file and copy there the values that are in `.envexample` making sure to change them to your own information

## Running the App

To run the program in your localhost browser, nagivate to your server folder (`cd server`) and run the command `node server.js` to run your server. 
The client should now be running on `http://localhost:5173`.

Then navigate to your client folder (`cd client`) and run the command `npm run dev` and click on the link to view the application in browser.
The server should now be running on `http://localhost:8005`.

## Testing

To run debugging tests on your forms, open a new terminal and navigate into your client folder (`cd client`) and run the command `npm run test`

## Edge Cases

- **Add Contact Form Error Handling**: This app displays a timed error message for if the user does not enter a name (required) when creating a new contact.
- **Database Error Handling**: Postman was used to make sure endpoints worked correctly 

## Database Schema

The database schema includes tables for contacts and for contact_details that have contact_id number as a foreign key:

-**contacts**: Stores contact_id, name, email, phone, notes
-**contact_details**: Stores detail_id, contact_id, birthday, company, job_title

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## Stretch Goals

- **Edit button pops up new window with editing options**
- **Create new contact form is hidden until you click an Add Contact button, then it pops up**
