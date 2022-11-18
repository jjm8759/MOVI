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
                 <Form>
                    <Form.field>
                        <label>First Name:</label>
                        <input type="text" placeholder="First Name"></input>
                       </Form.field>
                    <Form.field>
                        <label>Last Name:</label>
                        <input type="text" placeholder="Last Name"></input>
                    </Form.field>

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
                <button type="button">Register</button>
            </div>
        )}

    </div>
)
}

export default Register;