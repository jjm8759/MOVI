import express from 'express';
import { getGenres, getProviders } from '../actions/configActions.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/config
router.get('/genres', (req, res) => getGenres(req, res));
router.get('/providers', (req, res) => getProviders(req, res));

export default router;