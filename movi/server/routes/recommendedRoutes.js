import express from 'express';
import { deleteRecommended, getRecommended, postRecommended, putRecommended } from '../actions/recommendedActions.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/recommended/
router.get('/', (req, res) => getRecommended(req, res));
router.post('/', (req, res) => postRecommended(req, res));
router.put('/', (req, res) => putRecommended(req, res));
router.delete('/', (req, res) => deleteRecommended(req, res));

export default router;