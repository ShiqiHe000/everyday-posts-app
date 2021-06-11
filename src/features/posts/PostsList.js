import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllposts,
  fetchPosts,
  selectPostStatus,
  selectPostError,
 
} from './postSlice'
import { LOADING_STATUS } from '../../variables/loadingStatus'
import PostExcerpt from './PostExcerpt'

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllposts)
  const postStatus = useSelector(selectPostStatus)
  const error = useSelector(selectPostError)

  useEffect(() => {
    if (postStatus === LOADING_STATUS.IDLE) {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === LOADING_STATUS.FAILED) {
    content = <div>{error}</div>
  } else if (postStatus === LOADING_STATUS.LOADING) {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === LOADING_STATUS.SUCCEEDED) {
    console.log(posts);
    content = posts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ))
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
