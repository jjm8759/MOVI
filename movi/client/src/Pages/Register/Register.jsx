import useFetchData from "./authCalls";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form, Button } from 'semantic-ui-react';
const Register = () => {
    const {
        data,
        loading,
    } = useFetchData();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post("http://localhost:5000/user/signup",{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password:data.password
        });
    }

    return (
        <div>
            <h1>Register To MOVI</h1>
            {loading && <div>Loading</div>}
            {!loading && (
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Field>
                            <label>First Name:</label>
                            <input placeholder='First Name' type="text" {...register("firstName", { required: true})}/>
                            {errors.firstName && <span>Please input a First Name</span>}
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name:</label>
                            <input placeholder='Last Name' type="text" {...register("lastName", { required: true})}/>
                            {errors.lastName && <span>Please input a Last Name</span>}
                        </Form.Field>

                        <Form.Field>
                            <label>Email:</label>
                            <input placeholder='Email' type="text" {...register("Email", { required: true })}/>
                            {errors.email && <span>Please input an email</span>}
                        </Form.Field>
                        <Form.Field>
                            <label>Password:</label>
                            <input placeholder='Password' type="text" {...register("password", { required: true, maxLength: 18 })}/>
                            {errors.password && <span>Please input a password</span>}
                        </Form.Field>
                        <button type="button">Log In</button>
                    </Form>
                    <Button type="submit">Register</Button>
                </div>
            )}

        </div>
    )
}

export default Register;