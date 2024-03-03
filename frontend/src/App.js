import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Chatpage from './pages/Chatpage.jsx'

function App() {
  return (
    <div className="App">
      {/* <Landing /> */}
      <Chatpage />
    </div>
  );
}

export default App;
