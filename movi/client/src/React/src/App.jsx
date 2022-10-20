
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Discover from "./Discover";
import Movies from "./Movies";
import Account from "./Account";
import TVShows from "./TVShows";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element = {<TVShows/>}/>
      </Routes>
    </Router>
  );
}

export default App
