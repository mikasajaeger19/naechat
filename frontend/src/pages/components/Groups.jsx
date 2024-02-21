import React, {useState, useEffect} from 'react'

const Groups = () => {

  const [groups, setGroups] = useState([])

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('groupsbyuserid')
            const data = await response.json()
            setGroups(data)
        }
        fetchGroups()
    })

    const newChat = async () => {
        const response = await fetch('newchat')
        const data = await response.json()
        setGroups([...groups, data])
    }


  return (
    <div className='groups'>
        <div className="chats">
            <h1>chats</h1>
            <button onClick={newChat}><h1>+</h1></button>
        </div>
        <ul>
            {groups.map(group => (
            <li key={group.id}>{group.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default Groups
