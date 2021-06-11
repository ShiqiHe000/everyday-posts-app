import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { LOADING_STATUS } from '../../variables/loadingStatus'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    try {
      const allNotifications = selectAllNotifications(getState())
      const [latestNotification] = allNotifications
      const latestTimestamp = latestNotification ? latestNotification.date : ''
      const response = await client.get(
        `/fakeApi/notifications?since=${latestTimestamp}`
      )

      return response.notifications
    } catch (err) {
      console.log(err)
    }
  }
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    status: LOADING_STATUS.IDLE,
  },
  reducers: {
    allNotificationsRead(state, action) {
      state.notifications.forEach((notification) => (notification.read = true))
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = LOADING_STATUS.LOADING
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications.forEach((notification) => {
        notification.isNew = !notification.read
      })

      state.notifications.push(...action.payload)
      // sort with the newest first
      state.notifications.sort((a, b) => b.date.localeCompare(a.date))
      state.status = LOADING_STATUS.SUCCEEDED
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = LOADING_STATUS.FAILED
    },
  },
})

export default notificationSlice.reducer

export const { allNotificationsRead } = notificationSlice.actions

export const selectAllNotifications = (state) =>
  state.notifications.notifications

export const selectNotificationStatus = (state) => state.notifications.status
