import useFetchData from "./authCalls";
import React from "react";

const Register = () => {
  const {
    data,
    loading,
  } = useFetchData();

  return (
    <div>
  <h1>Register To MOVI</h1>
    {loading && <div>Loading</div>}
    {!loading && (
      <div>
        <form>
          <label>First Name:</label>
          <input type="text" placeholder="First Name"></input>
          <label>Last Name:</label>
          <input type="text" placeholder="Last Name"></input>
          <label>Email:</label>
          <input type="text" placeholder="Email"></input>
          <label>Password:</label>
          <input type="text" placeholder="Password"></input>
          <button type="button">Register</button>
        </form>
      </div>
    )}
    
    </div>
  )
}

export default Register;