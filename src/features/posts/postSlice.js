import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
// import { sub } from 'date-fns'
import { client } from '../../api/client'
import { LOADING_STATUS } from '../../variables/loadingStatus'


const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  // {
  //   id: '1',
  //   title: 'First Post!',
  //   content: 'Hello!',
  //   user: '0',
  //   date: sub(new Date(), { minutes: 10 }).toISOString(),
  //   reactions: { thumbsUp: 1, hooray: 2 },
  // },
  status: LOADING_STATUS.IDLE,
  error: null,
})


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await client.get('/fakeApi/posts')
    return response.posts // return to action.payload
  } catch (err) {
    console.log(err)
  }
})

export const createNewPost = createAsyncThunk(
  'post/createNewPost',
  async (initialPost) => {
    try {
      const response = await client.post('/fakeApi/posts', {
        post: initialPost,
      })

      return response.post
    } catch (err) {
      console.log(err)
    }
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
          },
        }
      },
    },
    postUpdated: (state, action) => {
  
      const {id, title, content} = action.payload;
      const targetPost = state.entities[id];
      if (targetPost) {
        targetPost.title = title
        targetPost.content = content
      }
    },
    addReaction: (state, action) => {
      const emoji = action.payload.emojiName
      const id = action.payload.postId
      if (emoji === '') return
      const post = state.entities[id];
      if (!post) return
      post.reactions[emoji]++;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = LOADING_STATUS.LOADING
    },
    [fetchPosts.fulfilled]: (state, action) => {
      postsAdapter.upsertMany(state, action.payload);
      state.status = LOADING_STATUS.SUCCEEDED
    },
    [fetchPosts.rejected]: (state, action) => {
      state.error = action.error.message
      state.status = LOADING_STATUS.FAILED
    },
    [createNewPost.pending]: (state, action) => {
      state.status = LOADING_STATUS.LOADING
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.status = LOADING_STATUS.SUCCEEDED
      return postsAdapter.addOne;
    },
    [createNewPost.rejected]: (state, action) => {
      state.status = LOADING_STATUS.FAILED
      state.error = action.error.message
    },
  },
})

export const { postAdded, postUpdated, addReaction } = postSlice.actions

export default postSlice.reducer

// the state here is the root state
// export const selectAllposts = (state) => state.posts.posts

export const {
  selectAll: selectAllposts, 
  selectById: selectPostById, 
  selectIds: selectPostIds
}
= postsAdapter.getSelectors(state => state.posts)


// export const selecPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)

export const selectPostStatus = (state) => state.posts.status

export const selectPostError = (state) => state.posts.error

export const selectPostByUser = createSelector(
  [selectAllposts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)
