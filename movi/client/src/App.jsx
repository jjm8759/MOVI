
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Discover from "./Pages/Discover/Discover";
import Recommended from "./Pages/Recommended/Recommended";
import Watched from "./Pages/Watched/Watched";
import Register from './Pages/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element = {<Discover/>}/> 
        {/* <Route path={'/watched'} element = {<Watched/>}/> */}
        {/* <Route path={'/recommended'} element = {<Recommended/>}/>  */}
      </Routes>
    </Router>
  );
}

export default App
