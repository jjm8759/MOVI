import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./login/loginActions";
import { signupFailure, signupStart, signupSuccess } from "./signup/signupActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("user/login", user);
    dispatch(loginSuccess(response.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};


export const signup = async (user, dispatch) => {
    dispatch(signupStart());
    try {
      const response = await axios.post("user/signin", user);
      dispatch(signupSuccess(response.data));
    } catch (err) {
      dispatch(signupFailure());
    }
  };