/**
 * This file verifies the users token using a secret key
 */
import jwt from 'jsonwebtoken';

/**
 * Verifies the json web token using a password held in the repo's .env
 */
function verifyToken (req, res, next){
    jwt.verify(req.body.token, process.env.PASS, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      } else {
        res.status(401).json("You are not authenticated!");
      }
      req.user = user;
      next();
    })
  }
  export default verifyToken;