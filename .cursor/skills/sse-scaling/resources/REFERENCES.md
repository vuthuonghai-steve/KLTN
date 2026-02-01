# SSE Scaling - References

## Redis Documentation

- [Redis Pub/Sub](https://redis.io/docs/interact/pubsub/) - Publish/Subscribe messaging
- [ioredis Library](https://github.com/luin/ioredis) - Node.js Redis client
- [Redis Connection Pooling](https://redis.io/docs/glossary/#connection-pool)

## Vercel Deployment

- [Vercel: Streaming Responses](https://vercel.com/docs/functions/streaming)
- [Vercel: Fluid Compute](https://vercel.com/docs/functions/runtimes) - Long-duration connections
- [Vercel: Environment Variables](https://vercel.com/docs/projects/environment-variables)

## Load Testing

- [Artillery.io](https://www.artillery.io/) - Load testing framework
- [k6](https://k6.io/) - Performance testing tool
- [Apache Bench](https://httpd.apache.org/docs/2.4/programs/ab.html) - Simple HTTP load testing

## Performance Monitoring

- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Datadog](https://www.datadoghq.com/) - Application Performance Monitoring
- [New Relic](https://newrelic.com/) - Full stack monitoring

## Database Integration

- [Node.js: Redis Transactions](https://redis.io/docs/interact/transactions/)
- [ioredis: Pipeline](https://github.com/luin/ioredis#pipeline) - Batch commands

## Related Concepts

- **Message Brokers**: RabbitMQ, Apache Kafka for complex message handling
- **Serverless Considerations**: Cold starts, connection limits, state management
- **Edge Computing**: Cloudflare Workers, AWS Lambda@Edge for distributed SSE

## Repository References

- `SKILL.md` (root) - SSE overview
- `Docs/life-1/03-research/sse-nextjs.md` - Redis integration prototype
