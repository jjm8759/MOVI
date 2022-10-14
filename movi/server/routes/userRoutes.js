import express from 'express';
import {signUpPage, userByEmail} from '../actions/userActions.js'
const router = express.Router(); // Get access to express router

router.get("/signUpPage", (req,res) => signUpPage(req,res));

router.get("/email",  (req,res) => userByEmail(req,res) );

export default router;