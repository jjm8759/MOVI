import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register'
import Discover from './Pages/Discover/Discover'
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <Router>

      <Routes>

        <Route exact path='/login' element={<Login/>} />

        <Route exact path='/register' element={<Register/>} /> 

        <Route exact path='/discover' element={<Discover/>} />
        
      </Routes>

    </Router>
  );
};

export default App;