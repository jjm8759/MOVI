import express from 'express';
import { deleteUsers, getUsers, postUsers, putUsers } from '../controllers/usersLogic.js';

const router = express.Router(); // Get access to express router

// root at localhost:5000/users/
router.get('/', (req, res) => getUsers(req, res));
router.post('/', (req, res) => postUsers(req, res));
router.put('/', (req, res) => putUsers(req, res));
router.delete('/', (req, res) => deleteUsers(req, res));

export default router;