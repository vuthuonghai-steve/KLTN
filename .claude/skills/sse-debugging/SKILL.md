---
name: sse-debugging
description: Debugging and error handling for SSE streams. Addresses common pitfalls including Vercel buffering, timeouts, connection drops, and reconnection strategies.
triggers:
  - sse debug
  - sse error
  - sse reconnect
  - sse troubleshooting
  - sse buffering
  - sse timeout
---

# SSE Debugging

Handle failures in realtime streams for robust social apps and notifications.

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| All data buffers until stream closes | Vercel delays streaming until response is complete | Use TransformStream instead of ReadableStream; ensure response returns immediately |
| Client disconnects after 60s | Vercel Pro timeout | Add heartbeat (send `:\n\n` every 15-30s) or upgrade to Vercel Fluid Compute |
| No auto-reconnect | EventSource closed due to error | Browser retries automatically after error; set custom `retry: 5000` in message |
| Connection drops silently | No heartbeat keeps connection alive | Server sends heartbeat comment lines; client logs onerror for debugging |
| Client stuck in reconnect loop | Server returns error status | Verify endpoint returns 200 OK with proper headers |

## Debugging Strategy

### 1. Check Server Response Headers

Ensure route handler returns correct headers:

```typescript
const headers = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
};
```

### 2. Add Server-Side Logging

Log when client connects and disconnects:

```typescript
const stream = new ReadableStream({
  start(controller) {
    console.log('SSE client connected');

    request.signal.addEventListener('abort', () => {
      console.log('SSE client disconnected');
      controller.close();
    });
  },
});
```

### 3. Monitor Network Traffic

Use browser DevTools Network tab:
- Check that response type is "text/event-stream"
- Verify messages end with `\n\n`
- Look for timing of messages (should be immediate, not buffered)

### 4. Test with curl

```bash
curl -v http://localhost:3000/api/notifications
```

Watch for chunked transfer encoding and message timing.

## Heartbeat Implementation

Keep SSE connection alive by sending comment lines every 15-30 seconds:

```typescript
// Server: Send heartbeat
const heartbeat = setInterval(() => {
  controller.enqueue(encoder.encode(':\n\n')); // Comment line
}, 30000);

// Cleanup on disconnect
request.signal.addEventListener('abort', () => {
  clearInterval(heartbeat);
  controller.close();
});
```

## Client Error Handling

Implement robust error handling with exponential backoff:

```typescript
es.onerror = (error) => {
  console.error('SSE connection error:', error);
  es.close();

  // Manual reconnection with backoff
  setTimeout(() => {
    // Reconnect (component remounts or creates new EventSource)
  }, 5000 * Math.pow(2, retryCount)); // Exponential backoff
};
```

## Vercel-Specific Issues

### Issue: Response buffers all data

**Cause**: Vercel waits for response to complete before flushing to client.

**Solution**: Return response immediately, keep stream open in background.

```typescript
// Return response right away (don't await async work)
return new NextResponse(stream, { headers });

// Async work happens in background
(async () => {
  // Send events
})();
```

### Issue: 60-second timeout on Vercel Pro

**Cause**: Default timeout for streaming responses.

**Solution**:
1. Add heartbeat (comment lines every 15-30s prevent timeout)
2. Or upgrade to Vercel Fluid Compute for unlimited duration

## Testing SSE Connections

### Local Testing

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Connect to SSE endpoint
curl -v http://localhost:3000/api/notifications
```

Watch for incoming data messages.

### Automated Testing with Jest

```typescript
test('SSE sends data before connection timeout', async () => {
  const response = await fetch('/api/notifications');
  const reader = response.body?.getReader();

  const { value } = await reader!.read();
  const text = new TextDecoder().decode(value);

  expect(text).toContain('data:');
});
```

## AI Debugging Prompts

**Prompt**: "Debug why SSE buffers all data until the stream ends in Next.js on Vercel."

**Prompt**: "Write client-side error handling for SSE with exponential backoff reconnection."

**Prompt**: "Add heartbeat to my SSE endpoint to prevent timeout disconnects."

## Related Concepts

- **Retry**: Browser automatically reconnects after `retry: <ms>` delay
- **Event IDs**: Use `id: <value>` to track message sequence for deduplication
- **Named events**: Use `event: <name>` to distinguish message types on client
