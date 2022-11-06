import React from "react";
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { useFetchers, useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { useEffect, useState } from "react";
// eslint-disable-next-line
const url = "http://localhost:5000/read";
const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const fetch = () => {
    axios.get(url).then((response) => setItems(response.data));
  };

  // component did mount
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="app">
      <h1>TUDOR</h1>
      {items.length > 0 &&
        items.map((item) => (
          <p key={item.user}>
            {item.user}, {item.object}
          </p>
        ))}

      <ul>
        <li>
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            {" "}
            Sign Up
          </button>
        </li>
        <button
          onClick={() => {
            navigate("/signin");
          }}
        >
          {" "}
          Log In
        </button>
      </ul>
    </div>
  );
};

export default Home;
