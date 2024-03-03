import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatwindow.css';

const Chatwindow = () => {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState([]);
  const getUsername = async (userId) => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/getUser/${userId}')
      setUsername(response.data.username)
    }
    catch (error){
      console.error('error retrieving userr')
    }
  }

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/message/group/1');
        console.log(response.data)
        
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    getChats(); // Call getChats directly instead of using setInterval
    // console.log(chats)
    // Cleanup function not required here since there's no interval
  }, []);

  return (
    <div className='window'>
      <div className='chatarea'>
        <ul className='chatlist'>
          {chats.map(chat => (
            <div key={chat.id} className={chat.userId === 1 ? "mine" : "yours"}>
              <p className='chat_username'>{chat.userId}</p>
              <li className='chat_message'>{chat.text}</li>
            </div>
          ))}
        </ul>
      </div>

      <div className='chat_input'>
        <button className='send'><p>send</p></button>
        <input type="text" placeholder="type a message" className='message_input' />
      </div>
    </div>
  );
};

export { Chatwindow };
