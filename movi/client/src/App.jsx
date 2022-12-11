import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register'
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
};

export default App;