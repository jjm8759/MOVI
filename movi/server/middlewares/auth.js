/**
 * This file verifies the users token using a secret key
 */
import jwt from 'jsonwebtoken';

/**
 * Verifies the json web token using a password held in the repo's .env
 */
function verifyToken(req, res, next) {
  const token = req.body.sessionToken || req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send('No session found');
  }
  try {
    jwt.verify(req.body.sessionToken, process.env.PASS, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}
export default verifyToken;