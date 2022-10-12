import  verifyUser from "../middlewares/verifyUser.js";
import actions from "../controllers/authActions";
import express from 'express';

const router = express.Router();


//This is used so that the verifyUser file can make calls to this route without being blocked
router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//Checks if user is providing a duplicate email before generating a new user.
router.post("/signup",
    [
    verifyEmail.checkDuplicateEmail,
    ],
    actions.signup
    );

router.post("/signin", actions.signin);
