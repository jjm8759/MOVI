import express from 'express';
import auth from '../middlewares/auth.js'
import {signUpPage, userByEmail, userDiscover} from '../actions/userActions.js'
const router = express.Router(); // Get access to express router


//This is used so that the verifyUser file can make calls to this route without being blocked
router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/signUpPage", (req,res) => signUpPage(req,res));

router.get("/userDiscover", [auth.verifyToken], (req,res) =>  userDiscover(req,res));

router.get("/email", [auth.verifyToken], (req,res) =>  userByEmail(req,res));

export default router;