import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/userSlice'

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))

  return <span>by {author ? author.name : 'Unknown Author'}</span>
}

export default PostAuthor
