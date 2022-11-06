import React from "react";
import axios from "axios";
import { useEffect } from "react";

import "./App.css";
import PostRequest from "./components/PostRequest";
import Home from "./components/Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/read", { mode: "cors" })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = '/' element = {<Home/>}>
        </Route>
      </Routes>
      <Routes>
      <Route path = '/signup' element = {<PostRequest/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
