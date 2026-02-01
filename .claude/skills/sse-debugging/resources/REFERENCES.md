# SSE Debugging - References

## Vercel-Specific Guides

- [Vercel: Streaming Responses](https://vercel.com/docs/functions/streaming)
- [Vercel: Edge Runtime Limits](https://vercel.com/docs/edge-runtime/limits)
- [Vercel: Fluid Compute](https://vercel.com/docs/functions/runtimes/edge-runtime) - For long-duration connections

## Browser APIs

- [MDN: EventSource API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
- [MDN: onerror Handler](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/onerror)
- [MDN: Request.signal (Abort)](https://developer.mozilla.org/en-US/docs/Web/API/Request/signal)

## Testing Tools

- **curl**: Test SSE endpoints from command line
  ```bash
  curl -v http://localhost:3000/api/notifications
  ```
- **Browser DevTools**: Network tab to inspect streaming responses
- **postman**: Can test SSE with streaming enabled

## Network Debugging

### View Chunked Responses

```bash
# Watch chunks arrive in real time
curl -i -N http://localhost:3000/api/notifications
```

### Monitor Connection Timeline

Browser DevTools → Network → Click SSE request → Timeline tab

## Related Documentation

- `sse-basics` skill - Core SSE implementation
- `Docs/life-1/03-research/sse-nextjs.md` - Prototype with heartbeat example
- [Node.js: Readable Streams](https://nodejs.org/api/stream.html#stream_readable_streams)
