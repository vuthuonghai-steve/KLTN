// app/api/notifications/route.ts
// SSE endpoint with Payload JWT authentication and EventEmitter

import { NextRequest, NextResponse } from 'next/server';
import { EventEmitter } from 'events';
import Redis from 'ioredis';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const dynamic = 'force-dynamic';

// Global event emitter for notifications (or use Redis for scaling)
const notificationEmitter = new EventEmitter();

// Optional: Redis for multi-instance scaling
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

// Helper: Verify Payload JWT token
async function verifyPayloadToken(token: string) {
  try {
    const payload = await getPayload({ config });
    const user = await payload.auth({ token });
    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  // Extract JWT from Authorization header
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: 'Missing authorization token' }, { status: 401 });
  }

  // Verify token and get user
  const user = await verifyPayloadToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const userId = user.id;
  const notificationChannel = `notifications:${userId}`;

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      console.log(`[SSE] User ${userId} (${user.email}) connected`);

      // Send initial confirmation
      controller.enqueue(
        encoder.encode(`data: {"status":"connected","userId":"${userId}"}\n\n`)
      );

      // Option 1: Use EventEmitter (single instance)
      const handleNotification = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      notificationEmitter.on(notificationChannel, handleNotification);

      // Option 2: Use Redis (for scaling across instances)
      // Uncomment to use Redis instead of EventEmitter
      /*
      const subscriber = redis.duplicate();
      await subscriber.subscribe(notificationChannel);

      subscriber.on('message', (channel, message) => {
        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      });
      */

      // Heartbeat to prevent timeout
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(':\n\n'));
      }, 30000);

      // Cleanup on disconnect
      const handleAbort = async () => {
        console.log(`[SSE] User ${userId} disconnected`);
        clearInterval(heartbeat);
        notificationEmitter.off(notificationChannel, handleNotification);

        // If using Redis:
        // await subscriber?.unsubscribe(notificationChannel);

        controller.close();
      };

      request.signal.addEventListener('abort', handleAbort);
    },
  });

  return new NextResponse(stream, { headers });
}

// Helper function to trigger notification (use from hooks or other routes)
export function triggerNotification(userId: string, data: any) {
  notificationEmitter.emit(`notifications:${userId}`, data);

  // If using Redis:
  // redis.publish(
  //   `notifications:${userId}`,
  //   JSON.stringify(data)
  // );
}
