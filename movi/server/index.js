// This file is the main launching point for the application.
// This is what is called by the start script "nodemon start"
//defined in package.json

import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

import { updateDatabaseConfig } from './externalApi/actions.js';
import app from './app.js'; // Import the express app from app.js

/**
 * A function that checks a text file containing the unix time of the last
 * database config update, and returns true if enough time has passed. Also
 * handles reading and writing of the file.
 */
 const shouldUpdateDatabaseConfig = () => {
    let filename = 'databaseConfigLastUpdated.txt';
    let lastUpdated = null;

    if (fs.existsSync(filename)) {
        lastUpdated = parseInt(fs.readFileSync(filename, 'utf-8'));
    } else {
        fs.writeFile(filename, Date.now().toString(), (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        // wasn't updated before, so return true
        return true;
    }

    console.log("The last database config update occured on "
                +`${new Date(lastUpdated).toLocaleString()}`)
    let millesecondsInAMonth = 2628000000;
    if (Date.now() - lastUpdated >= millesecondsInAMonth) {
        fs.writeFile(filename, Date.now().toString(), (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        return true;
    }
    console.log("An update does not need to be performed at this time.");
    return false;
}

const onDatabaseConnection = async () => { 
    console.log('MongoDB Connected...');

    // check if database configuration files need to be updated
    if (shouldUpdateDatabaseConfig()) {
        console.log("Updating database config from external API...");
        await updateDatabaseConfig();
    }

    app.listen(PORT, () => { // Start the server
        console.log('Server running at localhost:' + PORT);
    });
}

const PORT = process.env.PORT || 8000;
// Connect to MongoDB with mongoose -- https://cloud.mongodb.com/
mongoose.connect(process.env.MOVI_DB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    // If connection success, then...
    .then(onDatabaseConnection)
    .catch((error) => console.log(error.message)); // If error, catch it...