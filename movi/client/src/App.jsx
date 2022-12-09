import "./App.css";
import Login from "./Pages/Login/Login";
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default App;