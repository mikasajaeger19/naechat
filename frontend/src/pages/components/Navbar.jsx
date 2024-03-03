import React, { useState } from 'react';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {

    return (
        <div className="navbar">
           <a href = "/Profile"><h1 className='links'>introspect.</h1></a>
           <a href = "/Chatpage"><h1 className='links'>convey.</h1></a>
           <a href = "/Logout"><h1 className='links'>leave.</h1></a>
        </div>
    );

}

export {Navbar};