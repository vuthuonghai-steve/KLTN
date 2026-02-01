// app/api/notifications/route.ts
// Server-Sent Events (SSE) endpoint for streaming real-time notifications

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Validate authentication if needed
  // const token = request.headers.get('authorization')?.split(' ')[1];
  // if (!token || !verifyJwt(token)) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Send initial connection confirmation
      controller.enqueue(encoder.encode('data: {"status":"connected"}\n\n'));

      // Example: Send message after delay
      const timer = setTimeout(() => {
        controller.enqueue(
          encoder.encode('data: {"type":"notification","message":"Hello from SSE"}\n\n')
        );
      }, 2000);

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        clearTimeout(timer);
        controller.close();
      });

      // Optional: Send heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(':\n\n')); // Comment line as heartbeat
      }, 30000); // Every 30 seconds

      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
      });
    },
  });

  return new NextResponse(stream, { headers });
}
