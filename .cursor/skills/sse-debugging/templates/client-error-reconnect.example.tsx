// components/NotificationsWithRetry.tsx
// SSE client with robust error handling and exponential backoff

'use client';

import { useEffect, useState } from 'react';

interface Notification {
  type: string;
  message: string;
}

const MAX_RETRIES = 5;

export default function NotificationsWithRetry() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let retryTimer: NodeJS.Timeout | null = null;

    const connect = () => {
      eventSource = new EventSource('/api/notifications');

      eventSource.onopen = () => {
        console.log('SSE connected');
        setConnected(true);
        setError(null);
        setRetryCount(0); // Reset retry count on successful connection
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setNotifications((prev) => [...prev, data]);
        } catch (err) {
          console.error('Failed to parse message:', err);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        setConnected(false);
        eventSource?.close();

        if (retryCount < MAX_RETRIES) {
          // Exponential backoff: 1s, 2s, 4s, 8s, 16s
          const delay = Math.pow(2, retryCount) * 1000;
          setError(`Connection lost. Retrying in ${delay / 1000}s...`);
          setRetryCount((prev) => prev + 1);

          retryTimer = setTimeout(() => {
            connect();
          }, delay);
        } else {
          setError('Connection failed. Max retries exceeded.');
        }
      };
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, []);

  return (
    <div className="notifications-container">
      <div className="status">
        <div className={`badge ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
        {error && <div className="error-message">{error}</div>}
        {retryCount > 0 && <div className="retry-info">Retry attempt: {retryCount}/{MAX_RETRIES}</div>}
      </div>

      <div className="notifications-list">
        <h2>Notifications ({notifications.length})</h2>
        <ul>
          {notifications.map((notif, idx) => (
            <li key={idx}>
              <span className="type">{notif.type}</span>
              <span className="message">{notif.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
