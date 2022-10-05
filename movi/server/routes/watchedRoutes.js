import express from 'express';

import { getWatched, postWatched, putWatched, deleteWatched } from '../controllers/watchedLogic.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/watched/
router.get('/', (req, res) => getWatched(req, res));
router.post('/', (req, res) => postWatched(req, res));
router.put('/', (req, res) => putWatched(req, res));
router.delete('/', (req, res) => deleteWatched(req, res));

export default router;