
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Discover from "./Discover";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element = {<Discover/>}/> 
      </Routes>
    </Router>
  );
}

export default App
