import React from "react";
import axios from "axios";
import { useEffect } from "react";

import "./App.css";
import PostRequest from "./components/PostRequest";
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import {BrowserRouter, Routes, Route, useHistory} from 'react-router-dom'
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
        <Route path = '/' element = {<Home/>}/>
      </Routes>
      <Routes>
        <Route path = '/signup' element = {<PostRequest/>} />
      </Routes>
      <Routes>
        <Route path = '/signin' element = {<SignIn/>} />
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
