import React, { useState } from 'react';
import './Landing.css';
import axios from 'axios';

const Navbar = () => {

    return (
        <div className="navbar">
           <a href = "/Profile"><h1>introspect.</h1></a>
           <a href = "/Chatpage"><h1>convey.</h1></a>
           <a href = "/Logout"><h1>leave.</h1></a>
        </div>
    );

}

export default Navbar;