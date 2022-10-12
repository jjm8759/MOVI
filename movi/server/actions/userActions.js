
//Will send default sign up page
export const signUpPage = async (req, res) => {
    res.status(200).send("Sign Up Page");
  };

//Will send a users discover page info
export const userDiscover = async (req, res) => {
    res.status(200).send("User Discover Page");
  };

//Will grab a user by email provided
export const userByEmail = async (req, res) => {
    res.status(200).send("User by email");
  };
