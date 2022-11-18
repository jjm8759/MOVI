import User from "../models/user.js";

import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

/**
 * Gets user based on email provided if that user doesnt exits
 * @return null
 */
export const getUser = async(req,res) => {
  User.findOne({email: req.body.email}, (err,user) => {
    if(err){
      return res.status(500).send(err);
    }
    if(user){
      return res.status(200).send(user);
    }

    if(!user){
      return res.status(400).send({message: "User does not exist"});
    }
  })
}
/**
 * Logs the user out but finding their account based off email provided in request body and sets their session token to an empty 
 * string.
 */
export const logout = async (req, res) => {
  User.findOneAndUpdate({email: req.body.email}, { sessionToken: ""}, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send({
      message: "Logout successfull",
      sessionToken: ""
    });
  });
};

/**
 * Registers a new user to the database and stores an encrypted version of their password
 * then creates a session token for the user.
 */
export const registerUser = async (req, res) => {
  let token = jwt.sign({ email: req.body.email }, process.env.PASS, {
    expiresIn: 86400
  });
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    passwordHash: CryptoJS.AES.encrypt(req.body.passwordHash, process.env.PASS).toString(),
    sessionToken: token
  }).then(res.status(201).send("Registered Successfully"));
  
};

/**
* Logs the user in by authenticating the user email and then decrypting their password 
* to check if matches the request body. Creates a new session token for the user that expires in 24 hours
* and saves that token to the user collection.
*/
export const loginUser = async (req, res) => {

  let token = jwt.sign({ email: req.body.email }, process.env.PASS, {
    expiresIn: 86400 // 24 hours
  });

  const user = await User.findOneAndUpdate({email: req.body.email}, {sessionToken: token});

  if (!user) {
    res.status(404).send({ message: "Email Not found." });
  }
  const originalPass = CryptoJS.AES.decrypt(user.passwordHash, process.env.PASS).toString(CryptoJS.enc.Utf8);
  if (originalPass !== req.body.passwordHash) {
    res.status(401).send({ message: "Incorrect Password" });
  }

  res.status(200).send({
    email: user.email,
    sessionToken: token,
    message: "Successfully logged in"
  });
};

