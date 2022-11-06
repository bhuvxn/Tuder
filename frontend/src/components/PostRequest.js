import React from "react";
import { useState } from 'react';
import axios from 'axios';
const url = 'http://localhost:5000/signup';

const PostRequest = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, email, password);
    try {
      const resp = await axios.post(url, {user:user, email: email, password: password})
      console.log(resp.data)
    } catch(error){
      console.log();
    }

  };

  return (
    <section>
      <h2 className='text-center'>Register</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-input'
            id='user'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-input'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='Password' className='form-label'>
            Password
          </label>
          <input
            type='text'
            className='form-input'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block'>
          register
        </button>
      </form>
    </section>
  );
};
export default PostRequest;