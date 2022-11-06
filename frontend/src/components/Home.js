import React from "react";
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { useFetchers } from "react-router-dom";
// eslint-disable-next-line
import { useEffect } from "react";
import {useHistory} from 'react-router-dom'
// eslint-disable-next-line
const url = "http://localhost:5000/read"
const Home = () => {
  let history = useHistory();
  return (
    <div>
      <h1>Tuder</h1>
      <ul>
        <li>
          <button
            onClick={() => {
              history.push("/signup")
            }}
          > Sign Up</button>
        </li>
          <button
            onClick={() => {
              history.push("/signin")
            }}
          > Log In</button>
      </ul>
    </div>
  );
};

export default Home;
