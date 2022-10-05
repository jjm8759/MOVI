import express from 'express';
import { deleteTitles, getTitles, postTitles, putTitles } from '../controllers/titlesLogic.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/titles/
router.get('/', (req, res) => getTitles(req, res));
router.post('/', (req, res) => postTitles(req, res));
router.put('/', (req, res) => putTitles(req, res));
router.delete('/', (req, res) => deleteTitles(req, res));

export default router;