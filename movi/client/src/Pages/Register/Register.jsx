import React, { useState } from 'react';
import api from '../../apiCall.js';
import './Register.scss';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      api.put('/user/signup', {
        email,
        password,
        firstName,
        lastName,
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
        <h1 className='header'>Register To MOVI</h1>
        
        <form className='form' onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <input class="form__input"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input class="form__input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <button className='button' type="submit">Register</button>
          {userData && <p>Registered successfully</p>}
        </form>
      </div>
  );
};

export default Login;