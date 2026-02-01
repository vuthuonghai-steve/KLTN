. Bộ này bao gồm 5 skills chính, bao quát từ cơ bản đến nâng cao, tập trung vào ứng dụng AI để tối ưu: 
1. **SSE Basics** (cơ bản implement).
2. **SSE Debugging** (debug & error handling).
3. **SSE Scaling** (scaling & production).
4. **SSE Integration with Payload** (tích hợp CMS cho social app).
5. **SSE AI Optimization** (ứng dụng AI để build nhanh).

Bạn có thể copy-paste từng skill vào hệ thống AI agent của mình. Nếu cần mở rộng (ví dụ: thêm skill cho SSE vs WebSockets so sánh), hãy cho tôi biết để refine!

---

### Skill 1: SSE Basics
```
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
- Unidirectional: Server → Client only.
- Format: text/event-stream, messages end with \n\n.
- Auto-reconnect: Built-in retry (default 3s).
## Next.js Implementation
### Server (Route Handler)
```typescript
// app/api/sse-basics/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  (async () => {
    await writer.write(encoder.encode('data: {"message":"Hello SSE"}\n\n'));
    await writer.close();
  })();

  return new Response(stream.readable, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}
```
### Client (EventSource)
```tsx
useEffect(() => {
  const es = new EventSource('/api/sse-basics');
  es.onmessage = (e) => console.log(JSON.parse(e.data));
  return () => es.close();
}, []);
```
## AI Tip: Generate with Prompt
"Generate basic SSE endpoint in Next.js for social notifications."
```

---

### Skill 2: SSE Debugging
```
---
name: sse-debugging
description: Debugging and error handling for SSE streams. Common pitfalls, reconnection, Vercel issues.
triggers:
  - sse debug
  - sse error
  - sse reconnect
  - sse troubleshooting
---
# SSE Debugging
Handle failures in realtime streams for robust social apps.
## Common Issues & Fixes
| Issue | Cause | Fix |
|-------|-------|-----|
| Buffering | Vercel delays stream | Use TransformStream + async work after return. |
| Disconnect | Timeout | Add heartbeat: send ':\n\n' every 15s. |
| No reconnect | Error | Set retry: 5000 in message. |
## Debug Code
### Server Heartbeat
```typescript
const heartbeat = setInterval(() => writer.write(encoder.encode(':\n\n')), 15000);
// Cleanup: clearInterval on abort
```
### Client Error Handling
```tsx
es.onerror = (err) => {
  console.error(err);
  es.close(); // Manual retry with setTimeout
};
```
## AI Tip: Debug with Claude
"Debug why SSE buffers all data until end in Next.js Vercel deploy."
```

---

### Skill 3: SSE Scaling
```
---
name: sse-scaling
description: Scaling SSE for high-concurrency social apps. Pub/sub patterns, Redis integration, fan-out.
triggers:
  - sse scale
  - sse production
  - sse redis
  - sse concurrent
---
# SSE Scaling
From MVP to production: Handle 100+ users with low latency.
## Patterns
- Fan-out: Use Redis pub/sub for broadcast.
- Limits: Vercel Pro: 60s timeout → Use Fluid Compute.
## Redis Integration
```typescript
// Install: ioredis (nếu cho phép)
import Redis from 'ioredis';
const redis = new Redis();

export async function GET() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  redis.subscribe('notifications', (err, count) => {
    // Handle messages
  });

  redis.on('message', async (channel, message) => {
    await writer.write(encoder.encode(`data: ${message}\n\n`));
  });

  // Cleanup...
}
```
// Trigger: redis.publish('notifications', JSON.stringify(data));
## AI Tip: Scale with Copilot
"Refactor SSE with Redis pub/sub for 100 concurrent notifications in Next.js social network."
```

---

### Skill 4: SSE Integration with Payload
```
---
name: sse-payload-integration
description: Integrate SSE with Payload CMS for realtime updates in social apps (likes, comments, follows).
triggers:
  - sse payload
  - sse cms
  - sse hooks
  - realtime cms
---
# SSE with Payload CMS
Trigger SSE from CMS hooks for dynamic social feeds.
## Hook Pattern
```typescript
// collections/Posts.ts
hooks: {
  afterChange: [
    async ({ doc }) => {
      // Trigger SSE or Redis publish
      triggerSSE(doc.author.id, { type: 'update', data: doc });
    }
  ]
}
```
## Full Flow
- Hook detects change → Publish event.
- SSE handler subscribes → Streams to connected clients.
## AI Tip: Integrate with Cursor
"Generate Payload afterChange hook + SSE trigger for realtime like notifications in social app."
```

---

### Skill 5: SSE AI Optimization
```
---
name: sse-ai-optimization
description: Use AI to accelerate SSE development: code generation, refactoring, testing.
triggers:
  - sse ai
  - ai sse
  - optimize sse
  - ai realtime
---
# SSE AI Optimization
Leverage AI to reduce dev time 70%: Generate, debug, test SSE.
## Prompts for AI Agents
- Generate: "Create SSE prototype for news feed updates in Next.js with Vercel."
- Refactor: "Optimize SSE code for scaling with Redis in social app."
- Test: "Write Jest tests for SSE stream handling errors."
## Benefits (from X trends 2026)
- Cursor AI: Auto-complete SSE patterns.
- Claude: Suggest Vercel fixes.
## Example AI-Generated Test
```typescript
test('SSE handles abort', async () => {
  // Simulate request abort...
});
```
## Tip: Chain Agents
Use openspace: Spec → AI generate SSE code → AI debug .
```

