# SSE Payload Integration - References

## Payload CMS Documentation

- [Payload: Hooks Overview](https://payloadcms.com/docs/hooks/overview)
- [Payload: afterChange Hook](https://payloadcms.com/docs/hooks/after-change)
- [Payload: Authentication](https://payloadcms.com/docs/authentication/overview)
- [Payload: Collections](https://payloadcms.com/docs/collections/overview)

## Payload Types & Configuration

- [CollectionConfig Type](https://github.com/payloadcms/payload/blob/main/packages/payload/src/collections/types.ts)
- [Hook Context](https://payloadcms.com/docs/hooks/context) - Available hook parameters

## JWT Authentication

- [Payload: JWT Configuration](https://payloadcms.com/docs/authentication/config)
- [Node.js JWT Verification](https://www.npmjs.com/package/jsonwebtoken)

## Realtime Pattern Examples

- [Payload Examples: Hooks](https://github.com/payloadcms/payload/tree/main/examples)
- `Docs/life-1/03-research/sse-nextjs.md` - Full flow prototype with Payload hooks

## Performance & Scaling

- [Redis Pub/Sub](https://redis.io/docs/interact/pubsub/)
- [Node.js EventEmitter](https://nodejs.org/api/events.html)
- [Payload: Hooks Best Practices](https://payloadcms.com/docs/hooks/best-practices)

## Monitoring & Debugging

- [Payload: Logging](https://payloadcms.com/docs/getting-started/logging)
- [Datadog: APM Integration](https://docs.datadoghq.com/)

## Repository References

- `SKILL.md` (root) - SSE overview
- `sse-basics` skill - Core SSE implementation
- `sse-scaling` skill - Redis integration patterns
