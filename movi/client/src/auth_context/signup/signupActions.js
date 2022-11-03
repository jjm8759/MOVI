export const signupStart = () => ({
    type: "SIGNUP_START",
  });
  export const signupSuccess = (user) => ({
    type: "SIGNUP_SUCCESS",
    payload: user,
  });
  export const signupFailure = () => ({
    type: "SIGNUP_FAILURE",
  });