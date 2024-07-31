import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    function getUsers(){
      fetch("/api/users")
      .then(resp => resp.json())
      .then(data => {
        setUsers(data)})
    }
      getUsers()
    }, [])
  
  const usersMapped = users.map((user,index) => <li key={index}>{user.user}<br></br> {user.user}'s id: {user.id} </li>)

  return (
    
    <div>
    <h1><Link to="/users/create">Create a user</Link></h1>
    <h1>List of users:</h1>
    {usersMapped}


    </div>
  )
}

export default Users