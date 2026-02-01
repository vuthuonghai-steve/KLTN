# SSE Basics - References

## Core Documentation

- [MDN: Server-Sent Events (SSE) API](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Next.js: Route Handlers with Streaming](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## Repository References

- `SKILL.md` - Overview and concepts (root)
- `Docs/life-1/03-research/sse-nextjs.md` - Prototype implementation

## EventSource API

- MDN EventSource: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
- Browser support: All modern browsers (IE not supported)

## Message Format Specification

Server-Sent Events use line-oriented text protocol:

```
field: value\n
field: value\n
\n
```

Required for data message:
- `data: <value>\n\n` - Sends data field

Optional fields:
- `event: <type>\n` - Custom event name (default: "message")
- `id: <value>\n` - Event ID for tracking
- `retry: <milliseconds>\n` - Reconnect interval
- `:` - Comment line (can be used as heartbeat)

## Related Skills

- `sse-debugging` - Handle errors and reconnection
- `sse-payload-integration` - Trigger SSE from CMS
