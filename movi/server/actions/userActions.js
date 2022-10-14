import auth from '../middlewares/auth.js'
import User from "../models/user.js";
//Will send default sign up page
export const signUpPage = async (req, res) => {
    res.status(200).send("Sign Up Page");
  };

//Will grab a user by email provided
export const userByEmail = async (req, res) => {
    res.status(200).send("User by email");
  };
