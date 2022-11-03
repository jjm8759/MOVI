import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authActions";

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
    dispatch(loginStart());
    try {
      const response = await axios.post("user/signin", user);
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

export const logout= async (user, dispatch) => {
    dispatch(loginStart());
    try {
      const response = await axios.post("user/logout", user);
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };