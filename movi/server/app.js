// This file is where we define the express application
// and mount all the middleware functions onto the app.

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import titleRoutes from './routes/titleRoutes.js';
import watchedRoutes from './routes/watchedRoutes.js';
import recommendedRoutes from './routes/recommendedRoutes.js';
import configRoutes from './routes/configRoutes.js';
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Body parser is for parsing response bodies
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // We may not need it...
// Specify where to send requests to supported routes
app.use('/user', userRoutes);
app.use('/title', titleRoutes);
app.use('/watched', watchedRoutes);
app.use('/recommended', recommendedRoutes);
app.use('/config', configRoutes);
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Body parser is for parsing response bodies
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // We may not need it...
// Produce error for unknown routes
app.use('*', (req, res) => {
    res.status(404).json({ error: "route not found" });
})

export default app