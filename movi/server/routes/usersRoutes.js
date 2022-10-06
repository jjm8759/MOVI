import express from 'express';
import { deleteUsers, getUsersById, getAllUsers, getUserStatistics, postUsers, putUsers } from '../controllers/usersLogic.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/users/
router.get('/find/:id', (req, res) => getUsersById(req, res));
router.get('/', (req, res) => getAllUsers(req, res));
router.get('/stats', (req, res) => getUserStatistics(req, res));
router.post('/', (req, res) => postUsers(req, res));
router.put('/:id', (req, res) => putUsers(req, res));
router.delete('/:id', (req, res) => deleteUsers(req, res));

export default router;