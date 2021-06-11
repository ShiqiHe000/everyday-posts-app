import React from 'react'
import { Link } from 'react-router-dom'
import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Navbar = () => {
  const dispatch = useDispatch()
  const getNotifications = () => {
    dispatch(fetchNotifications())
  }

  const notifications = useSelector(selectAllNotifications)
  const unreadNotificationNumber = notifications.filter(
    (notification) => !notification.read
  ).length

  let unreadNotificationsBadge

  if (unreadNotificationNumber > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{unreadNotificationNumber}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={getNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
