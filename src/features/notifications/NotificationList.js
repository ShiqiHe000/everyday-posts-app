import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllNotifications,
  allNotificationsRead,
} from './notificationSlice'
import { selectorAllUsers } from '../users/userSlice'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'
import { LOADING_STATUS } from '../../variables/loadingStatus'
import {selectNotificationStatus} from './notificationSlice';

const NotificationList = () => {
  const notificationList = useSelector(selectAllNotifications)
  const users = useSelector(selectorAllUsers)
  const notificationStatus = useSelector(selectNotificationStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allNotificationsRead())
  })

  let renderNotifications
  if (notificationStatus === LOADING_STATUS.LOADING) {
    renderNotifications = <div className="loader">Loading...</div>
  } else if (notificationStatus === LOADING_STATUS.FAILED) {
    renderNotifications = <div>Error: cannot fetch the notifications</div>
  } else if (notificationStatus === LOADING_STATUS.SUCCEEDED) {
    renderNotifications = notificationList.map((notification) => {
      const date = parseISO(notification.date)
      const timeAgo = formatDistanceToNow(date)

      const user = users.find((user) => user.id === notification.user) || {
        name: 'Unknown User',
      }

      const notificationClassName = classnames('notification', {
        new: notification.isNew,
      })

      return (
        <div key={notification.id} className={notificationClassName}>
          <div>
            <b>{user.name}</b> {notification.message}
          </div>
          <div title={notification.date}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      )
    })
  }

  return (
    <section>
      <h2>Notifications</h2>
      {renderNotifications}
    </section>
  )
}

export default NotificationList
