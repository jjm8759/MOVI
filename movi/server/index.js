// This file is the main launching point for the application.
// This is what is called by the start script "nodemon start"
//defined in package.json

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js'; // Import the express app from app.js

// import models for testing
import User from './models/user.js';
import Title from './models/Title.js';
import WatchedTitle from './models/watchedTitle.js';
import RecommendedTitle from './models/recommendedTitle.js';

dotenv.config();
const PORT = process.env.PORT || 8000;
// Connect to MongoDB with mongoose -- https://cloud.mongodb.com/
mongoose.connect(process.env.MOVI_DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndexes: true
    })
    .then(() => { // If connection success, then...
        console.log('MongoDB Connected...');
        app.listen(PORT, () => { // Start the server
            console.log('Server running at localhost:' + PORT);
        });
    })
    .catch((error) => console.log(error.message)); // If error, catch it...

// Create a new User and insert into database
const user = await User.create({
    userId: 0,
    firstName: "Will",
    lastName: "Robinson",
    email: "robots@beep.boop",
    passwordHash: "iheartrobots",
    watchModes: ["NETFLIX", "DISNEYPLUS"],
});

const title = await Title.create({
    watchmodeId: 1234,
    title: "That Movie 2",
});

const watchedMovie = await WatchedTitle.create({
    user: user,
    title: title,
    userStars: 5
});

const recommendedTitle = await RecommendedTitle.create({
    user: user,
    title: title,
    watchlinkClicked: true,
    clickActionDate: Date.now()
});
  
console.log(user);
