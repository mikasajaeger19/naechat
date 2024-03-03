import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Groups.css';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [flag, setFlag] = useState(false);

  const handleNewChat = async () => {
    setFlag(true);
    try {
      const reqbody = { name: newGroup, userId: parseInt(localStorage.getItem('userId')) };
      const response = await axios.post('http://your-api-url/createnewchat', reqbody);
      setGroups([...groups, response.data]); // Axios automatically parses JSON response
      setNewGroup(''); // Clear the input field after adding the new group
    } catch (error) {
      console.error('Error creating new chat:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/group/allGroups');
        console.log(response)
        setGroups(response.data); // Axios automatically parses JSON response
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Handle error (e.g., show error message to user)
      }
    };
    fetchGroups();
    //setGroups(dummyGroups); // Replace with fetchGroups(
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewChat();
  };

  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
      setFlag(false);
    }
  };

  return (
    <div className='groups'>
      <div className="chats">
        <h1>chats</h1>
        <button onClick={handleNewChat}><h1>+</h1></button>
      </div>
      <ul className='grouplist'>
        {groups.map(group => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
      {flag && <input
        className='newgroup'
        type='text'
        value={newGroup}
        onChange={(e) => setNewGroup(e.target.value)}
        onKeyDown={enterKeyPress} // Call enterKeyPress when a key is pressed
        placeholder='Enter group name and press Enter'
      />}
    </div>
  );
};

export { Groups };
