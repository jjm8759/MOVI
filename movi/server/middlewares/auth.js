/**
 * This file verifies the users token using a secret key
 */
import jwt from 'jsonwebtoken';

import User from '../models/user.js'


export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.PASS, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
}

export default verifyToken;