import React from 'react'
import { useState, useEffect } from 'react'
import './Chatwindow.css'

const Chatwindow = () => {

  const [chats, setChats] = useState([]);

  useEffect(() => { 
        const getChats = async () => {
            const response = await fetch('getchatsuserid');
            const data = await response.json();
            setChats(data);
        }
        setInterval(getChats, 100);
    }); // Empty dependency array ensures this effect runs only once when component mounts

  return (
    <div>
      <div className='chatarea'>
        <ul>
          {chats.map(chat => (
            <div key={chat.id} className='message'>
                <p className = 'chat_username'>{chat.username}</p>
                <li className = 'chat_message'>{chat.message}</li>
            </div>
          ))}
        </ul>
      </div>
      <div>
      <button className='send'><p>send</p></button>
      </div>
      <div className='chatinput'>
        <input type="text" placeholder="type a message" className='message_input' />
        
      </div>
    </div>
  )
}

export default Chatwindow
