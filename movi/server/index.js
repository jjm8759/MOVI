// This file is the main launching point for the application.
// This is what is called by the start script "nodemon start"
//defined in package.json

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js'; // Import the express app from app.js


dotenv.config();
const PORT = process.env.PORT || 8000;
// Connect to MongoDB with mongoose -- https://cloud.mongodb.com/
mongoose.connect(process.env.MOVI_DB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(() => { // If connection success, then...
        console.log('MongoDB Connected...');
        app.listen(PORT, () => { // Start the server
            console.log('Server running at localhost:' + PORT);
        });
    })
    .catch((error) => console.log(error.message)); // If error, catch it...
