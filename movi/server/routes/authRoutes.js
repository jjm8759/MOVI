import  verifyUser from "../middlewares/verifyUser.js";
import {loginUser,registerUser} from "../actions/authActions.js";
import express from 'express';

const router = express.Router();

