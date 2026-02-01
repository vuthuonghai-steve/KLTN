---
name: sse-scaling
description: Scaling SSE for high-concurrency social apps. Covers pub/sub patterns, Redis integration, fan-out strategies, and production limits.
triggers:
  - sse scale
  - sse production
  - sse redis
  - sse concurrent
  - scale sse
  - redis pub sub
---

# SSE Scaling

From MVP to production: Handle 100+ concurrent users with low latency.

## Scaling Patterns

### 1. In-Memory (Development Only)

Using EventEmitter for single-server setups:

```typescript
import { EventEmitter } from 'events';

const notificationEmitter = new EventEmitter();

// Listener in route handler
notificationEmitter.on('notification', (data) => {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
});

// Trigger from other route
notificationEmitter.emit('notification', { userId, message });
```

**Limitations**: Single process only, loses messages on server restart.

### 2. Redis Pub/Sub (Recommended for Production)

Broadcast events across multiple server instances:

```typescript
import Redis from 'ioredis';

const redis = new Redis();

// In route handler: Subscribe to channel
redis.subscribe(`notifications:${userId}`, (err, count) => {
  if (err) controller.error(err);
});

// Receive messages
redis.on('message', (channel, message) => {
  controller.enqueue(encoder.encode(`data: ${message}\n\n`));
});

// Trigger from elsewhere
redis.publish(`notifications:${userId}`, JSON.stringify({ type: 'like', userId: 1 }));
```

**Benefits**: Works across multiple server instances, persistent message broker.

### 3. Fan-Out Pattern

Send same message to multiple recipients efficiently:

```typescript
// In Payload hook: Broadcast to all followers
const followers = await getFollowers(postAuthorId);

for (const follower of followers) {
  await redis.publish(
    `notifications:${follower.id}`,
    JSON.stringify({ type: 'new-post', postId, authorId })
  );
}
```

## Concurrency Limits

### Vercel Limits

| Plan | Timeout | Concurrent Connections |
|------|---------|------------------------|
| Pro | 60s | Limited by runtime |
| Enterprise | 900s (15m) | Limited by runtime |
| Fluid Compute | Unlimited | Scales dynamically |

### Node.js Limits

Default file descriptor limit: 1024 connections per process.

Increase for production:

```bash
# Linux: Check current limit
ulimit -n

# Increase to 65536
ulimit -n 65536
```

### Memory Per Connection

Estimate ~50KB-100KB per active SSE connection. For 1000 users:

- 1000 connections × 100KB = ~100MB memory
- With 4 server instances: 25MB per instance

## Load Testing

### Artillery.io Test

```yaml
# sse-load-test.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: 'SSE Connection Test'
    flow:
      - get:
          url: '/api/notifications'
          capture:
            - json: '$.message'
```

Run:

```bash
artillery run sse-load-test.yml
```

### Manual Test with curl

```bash
# Spawn 100 concurrent connections
for i in {1..100}; do
  curl -N http://localhost:3000/api/notifications &
done
```

## Performance Optimization

### 1. Connection Pooling

Reuse Redis connections across instances:

```typescript
const redis = new Redis({
  host: process.env.REDIS_HOST,
  maxRetriesPerRequest: null, // Important for pub/sub
  enableReadyCheck: false,
});
```

### 2. Message Batching

Batch multiple notifications into single message:

```typescript
const batch = await collectNotificationsForMs(100); // Wait 100ms for batch

redis.publish(
  `notifications:${userId}`,
  JSON.stringify({ batch: batch })
);
```

### 3. Selective Delivery

Only send to users who care about event type:

```typescript
// In hook: Get only users interested in this notification type
const subscribers = await getSubscribers(userId, 'likes');

for (const subscriber of subscribers) {
  redis.publish(`notifications:${subscriber.id}`, JSON.stringify(notification));
}
```

## Monitoring & Observability

### Key Metrics

- **Connection count**: Current active SSE connections
- **Message throughput**: Messages/sec through Redis
- **Memory usage**: Per instance and total
- **Latency**: Message publish → client receive (p50, p95, p99)

### Logging

```typescript
console.log(`[SSE] Client connected: ${clientId}`);
console.log(`[SSE] Published to ${recipientCount} users`);
console.log(`[SSE] Client ${clientId} disconnected after ${connectionDuration}ms`);
```

## Migration Path (MVP → Production)

1. **Week 1**: Deploy MVP with EventEmitter (single instance)
2. **Week 2**: Add basic monitoring, identify bottlenecks
3. **Week 3**: Migrate to Redis (multi-instance ready)
4. **Week 4**: Optimize delivery, add batching
5. **Ongoing**: Monitor latency and connection count

## AI Prompts for Scaling

**Prompt**: "Refactor my SSE code to use Redis pub/sub for scaling across multiple server instances."

**Prompt**: "Write a load test for SSE that simulates 1000 concurrent users connecting and receiving notifications."

**Prompt**: "How can I optimize SSE delivery to reduce latency when broadcasting to 10,000 users?"

## Related Concepts

- **Message queues** (vs pub/sub): Use RabbitMQ or AWS SQS if message persistence needed
- **WebSockets**: For bidirectional communication (more complex than SSE)
- **gRPC**: For internal service-to-service events (not client-facing)
