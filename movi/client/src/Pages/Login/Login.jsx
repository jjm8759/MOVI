
import React, { useState, useEffect } from 'react';
import api from '../../apiCall.js'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      api.put('/user/login', {
        email,
        password,
      })
        .then((res) => {
          setUserData(res.data);
          alert("Made");
        })
        .catch((err) => {
          setError(err.message);
        });
      setError(null);
    }
  }
    return (
      <div>
        <h1>Login to MOVI</h1>
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {userData && <p>Logged in successfully</p>}
        </form>
      </div>
    );
  };

export default Login;