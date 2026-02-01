// components/Notifications.tsx
// React component for consuming SSE notifications

'use client';

import { useEffect, useState } from 'react';

interface Notification {
  type: string;
  message: string;
  timestamp?: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const es = new EventSource('/api/notifications');

    es.onopen = () => {
      setConnected(true);
      setError(null);
    };

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifications((prev) => [...prev, data]);
      } catch (err) {
        console.error('Failed to parse notification:', err);
      }
    };

    es.onerror = (error) => {
      console.error('SSE error:', error);
      setConnected(false);
      setError('Connection lost. Retrying...');
      es.close();

      // Reconnect after 5 seconds
      setTimeout(() => {
        // Component will remount if needed, or retry can be handled differently
      }, 5000);
    };

    return () => {
      es.close();
    };
  }, []);

  return (
    <div className="notifications-container">
      <div className="status-badge">
        {connected ? '🟢 Connected' : '🔴 Disconnected'}
        {error && <span className="error-text">{error}</span>}
      </div>

      <div className="notifications-list">
        <h2>Notifications ({notifications.length})</h2>
        {notifications.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          <ul>
            {notifications.map((notif, idx) => (
              <li key={idx} className="notification-item">
                <strong>{notif.type}</strong>: {notif.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
