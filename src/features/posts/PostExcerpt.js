import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

const PostExcerpt = ({post}) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export default PostExcerpt
