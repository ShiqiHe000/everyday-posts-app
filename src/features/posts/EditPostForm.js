import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postUpdated, selectPostById } from './postSlice'
import { useHistory } from 'react-router-dom'

const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const dispatch = useDispatch()
  const history = useHistory()

  const post = useSelector(state => selectPostById(state, postId));
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  function onTitleChanged(e) {
    setTitle(e.target.value)
  }

  function onContentChanged(e) {
    setContent(e.target.value)
  }

  function onSavePostClicked() {
    if (!title || !content) {
      return alert('Please fill in title and content blanks.')
    }
    const updatedPost = {
      id: postId,
      title,
      content,
    }
    dispatch(postUpdated(updatedPost))
    history.push(`/post/${postId}`)
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}

export default EditPostForm
