import "./App.css";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
      
    </div >
  );
}


export default App