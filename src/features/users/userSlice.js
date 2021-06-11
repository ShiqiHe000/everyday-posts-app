import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LOADING_STATUS } from '../../variables/loadingStatus'
import { client } from '../../api/client'

const initialState = {
  // { id: '0', name: 'Tianna Jenkins' },
  users: [],
  status: LOADING_STATUS.IDLE,
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await client.get('/fakeApi/users')
    return response.users
  } catch (err) {
    console.log(err)
  }
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = LOADING_STATUS.LOADING
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = LOADING_STATUS.SUCCEEDED
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = LOADING_STATUS.FAILED
    },
  },
})

export default userSlice.reducer

export const selectorAllUsers = state => state.users.users;

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId)
