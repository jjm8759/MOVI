import express from 'express';

import { getWatched } from '../controllers/watchedLogic.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/watched/
router.get('/', (req, res) => getWatched(req, res));

export default router;