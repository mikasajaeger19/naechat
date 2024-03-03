import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatwindow.css';

const Chatwindow = () => {
  const [chats, setChats] = useState([]);
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/message/group/1');
        setChats(response.data);
        // Extract unique userIds from chat messages
        const userIds = Array.from(new Set(response.data.map(chat => chat.userId)));
        // Fetch usernames for each userId
        const usernameData = await Promise.all(userIds.map(async userId => {
          const usernameResponse = await axios.get(`http://localhost:5000/api/user/getUser/${userId}`);
          return { userId, username: usernameResponse.data.username };
        }));
        // Create a map of userIds to usernames
        const usernameMap = {};
        usernameData.forEach(data => {
          usernameMap[data.userId] = data.username;
        });
        setUsernames(usernameMap);
      } catch (error) {
        console.error('Error fetching chats:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchData();
  }, []);

  return (
    <div className='window'>
      <div className='chatarea'>
        <ul className='chatlist'>
          {chats.map(chat => (
            <div key={chat.id} className={chat.userId === 1 ? 'mine' : 'yours'}>
              <p className='chat_username'>{usernames[chat.userId]}</p>
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
