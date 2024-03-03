import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import axios from 'axios';
import Chatpage from './Chatpage';

const Landing = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

// const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login/', formData);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      // navigate('/Chatpage');
      // Handle successful login (e.g., redirect)
    } catch (err) {
      console.log(err);
      // Handle login error (e.g., display error message)
    }
  };

  const handleChange = (e) => {
    // Replace with your actual implementation to update form data
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="landing">
      <div className="signin_container">
        <form onSubmit={handleSubmit} autoComplete='off'>
          <button type="submit" className='signin'><a href= {Chatpage}><p>sign in to naechat</p></a></button>
            <input
              type="text"
              placeholder="username"
              name="username"
              className='username_input'
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              className='password_input'
              value={formData.password}
              onChange={handleChange}
              required
            />
        </form>
      </div>
      <h1 className="naechat">naechat</h1>
      <button className='new_here'><p >new here? sign up</p></button>
    </div>
  );
};

export default Landing;
