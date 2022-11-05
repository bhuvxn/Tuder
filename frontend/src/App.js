import "./App.css";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/*
      <Router>
        <Routes>
          <Route exact path="/Homepage">
            <Homepage />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
        </Routes>
      </Router>
  */}
    </div>
  );
}

export default App;
