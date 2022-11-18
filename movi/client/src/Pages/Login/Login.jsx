import React, { useState, useEffect } from "react";
import axios from "axios";


const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("")

useEffect(() => {
  fetch("http://localhost:8000/user/login")
    .then((res) => res.json())
    .then((data) => setEmail(data.email));
}, []);

function getUser() {
  axios.get("http://localhost:5000/", { crossdomain: true }).then(response => {
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setPassword(response.data.password);
  });
}