import express from 'express';
import { getAutoCompleteSearchResults, getTitleById, getTitleListings } from '../actions/titleActions.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/titles
router.get('/search/?', (req, res) => getAutoCompleteSearchResults(req, res));
router.get('/list/?', (req, res) => getTitleListings(req, res));
router.get('/:id?', (req, res) => getTitleById(req, res));

export default router;