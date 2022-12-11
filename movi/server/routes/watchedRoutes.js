import express from 'express';

import { getWatched, postWatched, deleteWatched } from '../actions/watchedActions.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/watched
router.get('/get', (req, res) => getWatched(req, res));
router.post('/create', (req, res) => postWatched(req, res));
router.delete('/remove', (req, res) => deleteWatched(req, res));

export default router;