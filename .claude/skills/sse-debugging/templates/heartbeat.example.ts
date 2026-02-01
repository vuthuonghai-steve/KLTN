// app/api/notifications/route.ts
// SSE endpoint with heartbeat to prevent timeout

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Send initial message
      controller.enqueue(encoder.encode('data: {"status":"connected"}\n\n'));

      // Heartbeat: Send comment line every 30 seconds to keep connection alive
      // Prevents Vercel 60-second timeout on Pro plan
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(':\n\n')); // Comment line (ignored by client)
      }, 30000); // Every 30 seconds

      // Cleanup on client disconnect
      request.signal.addEventListener('abort', () => {
        console.log('Client disconnected');
        clearInterval(heartbeat);
        controller.close();
      });

      // Example: Send notification after 5 seconds
      const notificationTimer = setTimeout(() => {
        controller.enqueue(
          encoder.encode('data: {"type":"notification","message":"Test notification"}\n\n')
        );
      }, 5000);

      // Cleanup notification timer on abort
      request.signal.addEventListener('abort', () => {
        clearTimeout(notificationTimer);
      });
    },
  });

  return new NextResponse(stream, { headers });
}
