import useFetchData from "./authCalls";
import React, { Form } from "react";

const Login = () => {
  const {
    data,
    loading,
  } = useFetchData();

  return (
    <div>
      <h1>Log In To MOVI</h1>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <Form>
            <Form.field>
              <label>Email:</label>
              <input type="text" placeholder="Email"></input>
            </Form.field>
            <Form.field>
              <label>Password:</label>
              <input type="text" placeholder="Password"></input>
            </Form.field>
            <button type="button">Log In</button>
          </Form>
        </div>
      )}

    </div>
  )
}

export default Login;