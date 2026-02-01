// app/api/notifications/route.ts
// SSE endpoint with Redis pub/sub for scaling across multiple server instances

import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

export const dynamic = 'force-dynamic';

// Create Redis instances
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null, // Required for pub/sub
});

const redisPubSub = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

export async function GET(request: NextRequest) {
  // Extract user ID from auth or query params
  // const userId = getUserIdFromToken(request);
  const userId = request.nextUrl.searchParams.get('userId') || 'default';

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const notificationChannel = `notifications:${userId}`;

      console.log(`[SSE] User ${userId} connected`);

      // Subscribe to user's notification channel
      redisPubSub.subscribe(notificationChannel, (err, count) => {
        if (err) {
          console.error(`[SSE] Subscribe error:`, err);
          controller.error(err);
        } else {
          console.log(`[SSE] Subscribed to ${count} channel(s)`);
          // Send connection confirmation
          controller.enqueue(encoder.encode('data: {"status":"connected"}\n\n'));
        }
      });

      // Handle incoming messages from Redis
      redisPubSub.on('message', (channel, message) => {
        try {
          controller.enqueue(encoder.encode(`data: ${message}\n\n`));
        } catch (err) {
          console.error(`[SSE] Failed to write message:`, err);
        }
      });

      // Heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(':\n\n'));
      }, 30000);

      // Cleanup on client disconnect
      const handleAbort = async () => {
        console.log(`[SSE] User ${userId} disconnected`);
        clearInterval(heartbeat);
        await redisPubSub.unsubscribe(notificationChannel);
        controller.close();
      };

      request.signal.addEventListener('abort', handleAbort);
    },
  });

  return new NextResponse(stream, { headers });
}

// Example: Trigger notification from another route
// POST /api/notifications/send
export async function POST(request: NextRequest) {
  try {
    const { userId, type, message } = await request.json();

    const notificationData = JSON.stringify({
      type,
      message,
      timestamp: new Date().toISOString(),
    });

    // Publish to user's notification channel
    const recipientCount = await redis.publish(
      `notifications:${userId}`,
      notificationData
    );

    console.log(`[SSE] Published to ${recipientCount} subscriber(s)`);

    return NextResponse.json({
      success: true,
      recipientCount,
    });
  } catch (error) {
    console.error('[SSE] Error publishing notification:', error);
    return NextResponse.json(
      { error: 'Failed to publish notification' },
      { status: 500 }
    );
  }
}
