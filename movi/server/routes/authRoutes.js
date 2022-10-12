import  verifyUser from "../middlewares/verifyUser.js";
import actions from "../controllers/authActions";

app.use(function(req, res, next) {

    //Allows the verifyUser file to make a request to this route
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

app.post(
    "/signup",
    [
      verifyEmail.checkDuplicateEmail,
    ],
    actions.signup
  );

  app.post("/signin", controller.signin);

