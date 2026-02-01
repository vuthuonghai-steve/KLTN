# SSE AI Optimization - Prompt Templates

Copy and customize these prompts for your specific needs.

## Generate Code

### Generate Basic SSE Endpoint
```
Generate a basic SSE endpoint in Next.js App Router that:
- Streams notifications to authenticated users
- Sends a heartbeat every 30 seconds to prevent timeout
- Includes proper error handling and cleanup on client disconnect
- Returns 401 if no valid auth token

Use NextRequest, NextResponse, and ReadableStream.
Include comments explaining each section.
```

### Generate Authenticated SSE Route
```
Create an SSE route handler in Next.js that:
1. Verifies JWT token from Authorization header
2. Returns 401 if token is invalid
3. Streams notifications specific to that user
4. Includes heartbeat and proper cleanup

Use Payload CMS auth (if available) or custom JWT verification.
```

### Generate React SSE Client Component
```
Create a React component that:
1. Connects to /api/notifications via EventSource
2. Parses JSON messages and displays them
3. Shows connection status (connected/disconnected)
4. Has error handling with console logging
5. Cleans up on unmount

Use React 18+ hooks (useEffect, useState).
Make it a Client Component ('use client').
```

### Generate Payload Hook for SSE
```
Create a Payload CMS afterChange hook that:
1. Detects when posts are liked (likesCount increases)
2. Publishes notification to Redis: notifications:{userId}
3. Notification includes: {type: 'like', postId, count}
4. Has error handling and logging
5. Doesn't block the document save

For the Posts collection in Payload.
```

## Refactor & Optimize

### Refactor to Redis Pub/Sub
```
I have an EventEmitter-based SSE implementation for 500 users.
I need to scale to multiple server instances (3-5 servers).

Show me how to refactor to use Redis pub/sub:
1. Replace EventEmitter with Redis
2. Handle connection pooling
3. Clean up subscriptions on disconnect
4. Keep the same client API (no changes needed)

Current code:
[paste your code]
```

### Optimize for High Concurrency
```
My SSE needs to handle 10,000 concurrent users.
Current setup: [describe current setup]

Suggest optimizations for:
1. Memory usage
2. Message latency
3. Connection handling
4. Scaling across 10 server instances

Show code examples for the top 3 optimizations.
```

### Add Message Batching
```
I'm seeing high Redis throughput (10k+ messages/sec) with my SSE.
How can I batch messages to reduce load?

Show me:
1. Server-side batching (wait 100ms, collect messages)
2. Client-side debouncing (wait 500ms before UI update)
3. Impact on latency and throughput

Include code examples.
```

## Debug Issues

### Debug Buffering Issue
```
My SSE endpoint buffers all messages until the connection closes.
Messages only arrive after client disconnects, then all at once.

Environment: Next.js 14 on Vercel Pro
Code:
[paste your route handler]

Why is this happening? How do I fix it?
```

### Debug Reconnection Loop
```
My SSE client keeps reconnecting every 5 seconds instead of staying connected.
Server is responding with 200 OK.

Client code:
[paste your component]

Why is this happening? How do I fix it?
```

### Debug Memory Leak
```
My SSE endpoint is leaking memory - 10MB per connection, doesn't release.
After 1000 connections, server runs out of memory.

Code:
[paste your route handler]

Where's the leak? How do I fix it?
```

## Write Tests

### Test SSE Endpoint
```
Write Jest tests for my SSE endpoint:
[paste route handler code]

Test these scenarios:
1. Client connects and receives initial message
2. Client receives heartbeat every 30s
3. Client disconnect closes stream immediately
4. Invalid auth token returns 401
5. Stream error is caught and logged

Mock fetch, Response, and ReadableStream.
```

### Test React Component
```
Write Jest tests for my SSE React component:
[paste component code]

Test:
1. Component opens EventSource on mount
2. Component displays received messages
3. Component shows connection status
4. Component handles errors
5. Component closes EventSource on unmount

Mock EventSource.
```

### Test Payload Hook
```
Write Jest tests for my Payload afterChange hook:
[paste hook code]

Test:
1. Hook fires after document save
2. Hook detects likes increase
3. Hook publishes to correct Redis channel
4. Hook handles Redis errors gracefully
5. Hook doesn't block document save

Mock Payload context and Redis.
```

## Compare Architectures

### SSE vs WebSockets
```
Should I use SSE or WebSockets for:
- One-way: Server sends, clients don't reply
- Scale: 1000 concurrent users expected
- Latency: <500ms acceptable
- Fallback: Need HTTP fallback for old browsers

Comparison: pros/cons, implementation complexity, costs.
Recommendation?
```

### Polling vs SSE
```
Current: Polling every 5 seconds for new notifications
Problem: High server load, battery drain on mobile

Should I switch to SSE?
- Would SSE reduce server load?
- Would SSE improve mobile battery?
- How hard is migration?

Show before/after comparison.
```

### EventEmitter vs Redis vs Message Queue
```
Which approach for multi-instance notifications?

Options:
1. EventEmitter (single instance only)
2. Redis pub/sub (broadcast to all instances)
3. RabbitMQ queue (persistent, complex)
4. AWS SNS/SQS (managed, cloud-specific)

Use case: 500-5000 concurrent users, multi-instance Vercel.
Latency requirement: <200ms

Compare: complexity, cost, latency, reliability.
```

## Architecture & Design

### Design SSE System
```
Design a realtime notification system for a social app:
- Features: post likes, comments, follows, mentions
- Scale: 10,000 concurrent users
- Latency: <100ms
- Deployment: Vercel

Show:
1. Architecture diagram (ASCII or describe)
2. Data flow (client → server → database → other clients)
3. Scaling strategy (servers, database, Redis)
4. Technology choices with rationale
```

### Plan Migration from Polling
```
We're currently polling every 5 seconds. Plan migration to SSE:

Current setup: [describe]
Target scale: [describe]

Show:
1. Phase 1: Run SSE alongside polling (2 weeks)
2. Phase 2: Migrate users to SSE (2 weeks)
3. Phase 3: Deprecate polling (1 week)
4. Rollback plan if SSE fails

Include estimated effort per phase.
```

## Performance

### Measure SSE Latency
```
How do I measure end-to-end latency of my SSE system?

Flow: Event happens → Published → Client receives

Show:
1. How to instrument the code
2. What to measure (server time, network time, client time)
3. What's "good" latency (<100ms? <500ms?)
4. Tools for monitoring

Provide code examples.
```

### Calculate Resource Usage
```
Estimate resources needed for my SSE:

Scale: 10,000 concurrent users
Setup: 5 server instances on Vercel, Redis

Estimate:
1. CPU usage per instance
2. Memory per instance
3. Bandwidth (inbound + outbound)
4. Redis memory
5. Cost per month

Show assumptions and formulas.
```
