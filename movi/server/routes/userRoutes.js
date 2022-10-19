import express from 'express';
import {userByEmail, registerUser, loginUser} from '../actions/userActions.js'

const router = express.Router(); // Get access to express router

router.get("/email",  (req,res) => userByEmail(req,res));

router.post("/signup",  (req,res) => registerUser(req,res));

router.post("/login",(req,res) =>  loginUser(req,res));

export default router;
