import User from "../models/user.js";
import CryptoJS from "crypto-js";
import checkDuplicateEmail from "../middlewares/verifyUser.js";

//Will grab a user by email provided
//User user verify token middleware when implementing
export const userByEmail = async (req, res) => {
    res.status(200).send("User by email");
  };

export const changePassword = async (req,res) => {

}

/**
 * Registers a new user to the database and stores an encrypted version of their password 
 */
 export const registerUser = async(req,res) =>{
  if(checkDuplicateEmail){
    res.status(400).json("This email is already in use");
  }
  const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: CryptoJS.AES.encrypt(req.body.passwordHash, process.env.PASS).toString()
  });

  try{
      const user = newUser.save();
      res.status(201).res.json(user);
  }catch(err){
    console.log(err);
  }
};

/**
* Logs the user in by authenticating the user email and then decrypting their password 
* and checking it matches the request body. Creates a new session token for the user that expires in 24 hours
* and saves that token to the user schema.
*/
export const loginUser = async(req,res) => {
  const user = User.findOne({
      email: req.body.email
  }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      if (!user) {
        res.status(404).send({ message: "Email Not found." });
      }
      
      let originalPassword = CryptoJS.AES.decrypt(user.passwordHash, process.env.PASS).toString();

      if( originalPassword !== req.body.passwordHash){
          res.status(401).send({message: "Incorrect Password"});
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

