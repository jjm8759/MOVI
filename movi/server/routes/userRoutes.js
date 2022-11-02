import express from 'express';
import checkDuplicateEmail from "../middlewares/verifyUser.js";
import { registerUser, loginUser, logout} from '../actions/userActions.js';

const router = express.Router(); // Get access to express router

router.put("/logout", (req,res) => logout(req,res));

router.post("/signup", checkDuplicateEmail,  (req,res) => registerUser(req,res));

router.post("/login",(req,res) =>  loginUser(req,res));

export default router;
