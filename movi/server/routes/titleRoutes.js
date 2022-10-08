import express from 'express';
import { getTitleById } from '../actions/titleActions.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/titles/
router.get('/:id', (req, res) => getTitleById(req, res));
// router.post('/', (req, res) => postTitles(req, res));
// router.put('/', (req, res) => putTitles(req, res));
// router.delete('/', (req, res) => deleteTitles(req, res));

export default router;