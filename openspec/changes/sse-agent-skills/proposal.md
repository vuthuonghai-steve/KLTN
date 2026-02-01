## Why

Khi làm việc với SSE (Server-Sent Events) trong Next.js + Payload CMS, developers thường gặp khó khăn vì thiếu hướng dẫn chuẩn hóa. Các vấn đề phổ biến: buffering trên Vercel, timeout, reconnection, tích hợp CMS hooks. Cần bộ agent skills giúp AI assistants (Cursor/Claude) hỗ trợ developer nhanh chóng implement, debug và scale SSE realtime.

## What Changes

- Tạo mới 5 agent skills trong `.cursor/skills/`:
  - `sse-basics`: Implement cơ bản Route Handler + EventSource
  - `sse-debugging`: Debug buffering, heartbeat, reconnection
  - `sse-scaling`: Redis pub/sub, fan-out, production limits
  - `sse-payload-integration`: Payload hooks trigger SSE events
  - `sse-ai-optimization`: AI prompts để generate/debug/test SSE
- Mỗi skill có: SKILL.md (nội dung chính), templates/ (code mẫu), resources/REFERENCES.md (tài liệu tham chiếu)
- Mirror sang `.claude/skills/` (nếu cần)

## Capabilities

### New Capabilities
- `sse-basics-skill`: Skill hướng dẫn implement SSE cơ bản (TransformStream, EventSource, text/event-stream format)
- `sse-debugging-skill`: Skill xử lý lỗi SSE (Vercel buffering, heartbeat, onerror, reconnect)
- `sse-scaling-skill`: Skill scaling SSE (Redis pub/sub, concurrent connections, timeout management)
- `sse-payload-integration-skill`: Skill tích hợp Payload CMS hooks với SSE (afterChange trigger)
- `sse-ai-optimization-skill`: Skill tối ưu AI prompts cho SSE development workflow

### Modified Capabilities

(Không có - đây là bộ skills hoàn toàn mới)

## Impact

- **Files created**: 5 thư mục skill trong `.cursor/skills/`, mỗi thư mục gồm SKILL.md + templates/ + resources/
- **Dependencies**: Không thêm dependencies mới vào project
- **Affected code**: Chỉ thêm files trong `.cursor/skills/`, không ảnh hưởng source code
- **AI integration**: Skills sẽ được AI agents (Cursor, Claude Code) sử dụng khi trigger keywords SSE-related
