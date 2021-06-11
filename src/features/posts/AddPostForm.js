import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { createNewPost } from './postSlice'
import { LOADING_STATUS } from '../../variables/loadingStatus'

const AddPostForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState(LOADING_STATUS.IDLE)
  const users = useSelector((state) => state.users.users)
  const canSave =
    [title, content, userId].every(Boolean) &&
    addRequestStatus === LOADING_STATUS.IDLE

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setAddRequestStatus(LOADING_STATUS.LOADING)

        const result = await dispatch(
          createNewPost({ title, content, user: userId })
        )
        unwrapResult(result) // catch the err is post is rejected

        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post.', err)
      } finally {
        setAddRequestStatus(LOADING_STATUS.IDLE)
      }

     
    } else {
      alert('Please fill in all the blanks.')
    }
  }

  const usersOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

  const onAuthorChanged = (e) => {
    setUserId(e.target.value)
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={(e) => onSavePostClicked(e)}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
