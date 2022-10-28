
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Discover from "./Pages/Discover/Discover";
import Movies from "./Watched";
import Account from "./Pages/Watched/Watched";
import TVShows from "./TVShows";

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
