import React from 'react'
import { selectorAllUsers } from './userSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const users = useSelector(selectorAllUsers)

  const usersList = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>
      <ul>{usersList}</ul>
    </section>
  )
}

export default UsersList
