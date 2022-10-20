import User from "../models/user.js";
import CryptoJS from "crypto-js";
import { checkDuplicateEmail } from "../middlewares/verifyUser.js";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth.js";

//Will grab a user by email provided
//User user verify token middleware when implementing
export const userByEmail = async (req, res) => {
  await verifyToken();
  const user = User.findOne({
    email: req.body.email
  }).exec((err,user) => {
    if(err){
      res.status(500).send(err);
    }

    if(user){
      res.status(200).send(user);
    } 
  })
};

export const logout = async (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { sessionToken: "" }
  ).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }

    if (user) {
      res.status(200).send("Successfully logged out");
    }
  })
};

/**
 * Registers a new user to the database and stores an encrypted version of their password
 * then creates a session token for the user.
 */
export const registerUser = async (req, res) => {
  let token = jwt.sign({ email: req.body.email }, process.env.PASS, {
    expiresIn: 86400
  });
  checkDuplicateEmail(req,res);
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
* and checking it matches the request body. Creates a new session token for the user that expires in 24 hours
* and saves that token to the user schema.
*/
export const loginUser = async (req, res) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }

    if (!user) {
      res.status(404).send({ message: "Email Not found." });
    }

    let originalPassword = CryptoJS.AES.decrypt(user.passwordHash, process.env.PASS).toString();

    if (originalPassword !== req.body.passwordHash) {
      res.status(401).send({ message: "Incorrect Password" });
    }

    let token = jwt.sign({ email: user.email }, process.env.PASS, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      email: user.email,
      sessionToken: token
    });
  });
};

