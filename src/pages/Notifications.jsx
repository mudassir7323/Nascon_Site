import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SYSTEM = "System";
const EVENT = "Event";
const PAYMENT = "Payment";
const ACCOMMODATION = "Accommodation";
const SPONSORSHIP = "Sponsorship";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const baseUrl = BaseUrl;
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${baseUrl}/notifications/?skip=0&limit=100`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setNotifications(response.data.notifications || []);
        setUnreadCount(response.data.unread_count || 0);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [accessToken, baseUrl]);

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${baseUrl}/notifications/${id}/read`,
        {},
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );
      setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error('Error marking as read:', error);
      alert('Failed to mark notification as read.');
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${baseUrl}/notifications/mark-all-read`,
        {},
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotifications((prev) => prev.map((notification) => ({ ...notification, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
      alert('Failed to mark all notifications as read.');
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading notifications...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Notifications</h2>
      {unreadCount > 0 && (
        <div className="mb-3">
          <button className="btn btn-primary btn-sm" onClick={markAllAsRead}>
            <i className="bi bi-check-all me-2"></i> Mark All as Read ({unreadCount})
          </button>
        </div>
      )}
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`list-group-item d-flex justify-content-between align-items-start ${
                !notification.is_read ? 'list-group-item-info' : ''
              }`}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{notification.title}</div>
                {notification.message}
                <small className="text-muted ms-2">
                  Type: {notification.notification_type} | Created At: {new Date(notification.created_at).toLocaleString()}
                </small>
              </div>
              {!notification.is_read && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => markAsRead(notification.id)}
                >
                  <i className="bi bi-check-lg"></i> Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;