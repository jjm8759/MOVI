/**
 * This file verifies that the users email is unique to the database and if the token matches the current user
 */

import User from '../models/user.js';

/**
 * Checks if the users email is in use or not. This will be used for the sign up functionality so 
 * there are no duplicate user logins in the future.
 */

function checkDuplicateEmail(req, res, next){
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });;
      }

      if (user) {
        return res.status(400).send({ message: "Email is already in use!" });
      }

      next();
    });
};
export default checkDuplicateEmail;