// This file is where we define the express application
// and mount all the middleware functions onto the app.

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import titleRoutes from './routes/titleRoutes.js';
import watchedRoutes from './routes/watchedRoutes.js';

import recommendedRoutes from './routes/recommendedRoutes.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true})); // Body parser is for parsing response bodies
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true})); // We may not need it...

// Specify where to send requests to supported routes
app.use('/title', titleRoutes);
app.use('/user', userRoutes);
app.use('/watched', watchedRoutes);
app.use('/recommended', recommendedRoutes);

app.use(cors());

// Produce error for unknown routes
app.use('*', (req,res) => {
    res.status(404).json({error: "route not found"});
})

export default app