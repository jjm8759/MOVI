import express from 'express';
import verifyToken from '../middlewares/auth.js';
import checkDuplicateEmail from "../middlewares/verifyUser.js";
import { registerUser, loginUser, logout, getUser} from '../actions/userActions.js';

const router = express.Router(); // Get access to express router
router.get("/logout", (req,res) => logout(req,res));

router.post("/signup", checkDuplicateEmail,  (req,res) => registerUser(req,res));

router.put("/login",(req,res) =>  loginUser(req,res));

router.get("/email", verifyToken,  (req,res) => getUser(req,res));

export default router;
