---
name: sse-basics
description: Core implementation of Server-Sent Events (SSE) for realtime one-way communication in Next.js. Basic patterns for setup, message format, and client consumption.
triggers:
  - sse basics
  - implement sse
  - sse setup
  - realtime stream
---

# SSE Basics

Foundation for SSE in social apps: one-way server push for notifications, feeds.

## Core Concepts

- **Unidirectional**: Server → Client only. No client → server communication on same connection.
- **Format**: Messages use `text/event-stream` content type, each message ends with `\n\n`.
- **Auto-reconnect**: Built-in browser retry (default 3s). Can be customized with `retry: 5000` message.
- **Use cases**: Notifications, live feeds, real-time updates from server.

## Next.js Implementation

### Server (Route Handler)

Create a route handler that streams events using TransformStream or ReadableStream.

```typescript
// app/api/sse-basics/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  (async () => {
    // Send initial message
    await writer.write(encoder.encode('data: {"message":"Hello SSE"}\n\n'));

    // Keep stream open (can send more messages)
    await new Promise(resolve => setTimeout(resolve, 5000));
    await writer.write(encoder.encode('data: {"message":"Still connected"}\n\n'));

    await writer.close();
  })();

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  });
}
```

### Client (React Component)

Use EventSource to connect and listen for messages.

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function SSEClient() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const es = new EventSource('/api/sse-basics');

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data.message]);
    };

    es.onerror = (error) => {
      console.error('SSE error:', error);
      es.close();
    };

    return () => es.close();
  }, []);

  return (
    <div>
      <h1>SSE Messages</h1>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  );
}
```

## Message Format

SSE messages follow a specific format:

```
data: {"key": "value"}\n\n
```

Multi-line data:

```
data: line 1\n
data: line 2\n
\n
```

With event name:

```
event: custom-event\n
data: {"info": "event data"}\n
\n
```

## Retry Handling

Customize reconnect interval (milliseconds):

```
retry: 5000\n
data: {"message": "reconnect in 5s"}\n
\n
```

## AI Tip

Use AI to generate SSE endpoints quickly:

**Prompt**: "Generate a basic SSE endpoint in Next.js for social notifications. Send notifications to a specific user."

**Prompt**: "Create a React component that connects to an SSE endpoint and displays real-time messages."

## Common Patterns

### Single message then close
```typescript
await writer.write(encoder.encode('data: {"status":"ok"}\n\n'));
await writer.close();
```

### Continuous stream
Keep connection open and send messages periodically. Add heartbeat to prevent timeout.

### Event types
Use `event: <name>` to differentiate message types on client:
```typescript
await writer.write(encoder.encode('event: notification\ndata: {"type":"like"}\n\n'));
```

Client listens with `es.addEventListener('notification', handler)`.
