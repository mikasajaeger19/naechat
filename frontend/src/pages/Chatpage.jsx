import React from 'react'
import {Chatwindow} from './components/Chatwindow'
import {Groups} from './components/Groups'
import {Navbar} from './components/Navbar'
import './Chatpage.css'

const Chatpage = () => {
  return (
    <div className='chatpage'>
      <Navbar />
      <div className='group_window'>
        <Groups />
        <Chatwindow />
      </div>
    </div>
  )
}

export default Chatpage
