import React, { useState } from 'react';
import api from '../../apiCall.js';
import './Login.scss';
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
        })
        .catch((err) => {
          setError(err.message);
        });
      setError(null);
    }
  }
  return (
      <div className='main'>
        <h1 className='header'>Log In To MOVI</h1>
        <form className='form' onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <input class="form__input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input class="form__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='button' type="submit">Login</button>
          {userData && <p>Logged in successfully</p>}
        </form>
      </div>
  );
};

export default Login;