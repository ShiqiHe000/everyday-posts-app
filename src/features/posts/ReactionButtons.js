import React from 'react'
import { useDispatch } from 'react-redux'
import { addReaction } from './postSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const addReactionToPost = (postId, emojiName) => {
    dispatch(
      addReaction({
        emojiName,
        postId,
      })
    )
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => addReactionToPost(post.id, name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}

export default ReactionButtons
