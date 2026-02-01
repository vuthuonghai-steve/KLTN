## Context

Project sử dụng OpenSpec workflow với Payload CMS và Next.js App Router. Đã có research về SSE implementation (Docs/life-1/03-research/sse-nextjs.md) và outline 5 skills (root SKILL.md). Cần chuẩn hóa thành agent skills để Cursor/Claude Code có thể hỗ trợ developer khi làm việc với SSE realtime.

Hiện tại trong `.cursor/skills/` đã có các skills OpenSpec (openspec-apply, openspec-archive, v.v.) làm mẫu về cấu trúc frontmatter và format.

## Goals / Non-Goals

**Goals:**
- Tạo 5 skills hoàn chỉnh với SKILL.md, templates/, resources/
- Mỗi skill có frontmatter chuẩn (name, description, triggers)
- Code templates lấy từ research document (sse-nextjs.md)
- Skills trigger đúng keywords liên quan đến SSE

**Non-Goals:**
- Không tạo thêm skills ngoài 5 skills định nghĩa
- Không thay đổi cấu trúc thư mục skills hiện có
- Không implement actual SSE code trong project (chỉ tạo skill documentation)
- Không mirror sang .claude/skills/ trong phase này (tùy chọn sau)

## Decisions

### Decision 1: Cấu trúc thư mục mỗi skill

```
.cursor/skills/sse-{name}/
├── SKILL.md              # Nội dung chính (bắt buộc)
├── templates/            # Code mẫu (tùy chọn)
│   └── *.example.ts|tsx|md
└── resources/            # Tài liệu tham chiếu (tùy chọn)
    └── REFERENCES.md
```

**Rationale**: Tách biệt documentation (SKILL.md), code mẫu (templates/), và tài liệu tham chiếu (resources/) giúp maintain dễ dàng hơn. Templates có thể copy-paste trực tiếp.

**Alternatives considered**:
- Chỉ có SKILL.md: Đơn giản nhưng code dài làm file khó đọc
- Inline code trong SKILL.md: Khó extract và reuse

### Decision 2: Frontmatter format

```yaml
---
name: sse-{name}
description: <mô tả ngắn gọn>
triggers:
  - keyword 1
  - keyword 2
---
```

**Rationale**: Consistent với các skills OpenSpec hiện có. Triggers giúp AI biết khi nào activate skill.

### Decision 3: Templates mapping

| Skill | Templates |
|-------|-----------|
| sse-basics | route-handler.example.ts, client-eventsource.example.tsx |
| sse-debugging | heartbeat.example.ts, client-error-reconnect.example.tsx |
| sse-scaling | redis-subscribe.example.ts |
| sse-payload-integration | after-change-hook.example.ts, route-with-auth.example.ts |
| sse-ai-optimization | prompts.example.md |

**Rationale**: Mỗi skill có templates phù hợp với use case. Code lấy từ sse-nextjs.md research.

### Decision 4: SKILL.md sections structure

1. Core Concepts - Giải thích lý thuyết
2. Implementation / Patterns - Hướng dẫn thực hành
3. Code Examples - Reference đến templates/
4. AI Tips - Prompts mẫu cho AI assistance

**Rationale**: Cấu trúc này cover từ hiểu lý thuyết đến thực hành, phù hợp cho cả beginner và experienced developers.

## Risks / Trade-offs

**[Risk] Skills outdated khi Next.js/Payload thay đổi API**
→ Mitigation: Ghi version trong REFERENCES.md, review định kỳ

**[Risk] Templates không work trong mọi setup**
→ Mitigation: Ghi rõ prerequisites (Next.js App Router, Payload v3+) trong SKILL.md

**[Risk] Triggers overlap giữa skills**
→ Mitigation: Triggers cụ thể theo skill (sse-basics vs sse-debugging vs sse-payload)

**[Trade-off] Tách templates vs inline code**
→ Accept: Tách templates dễ maintain hơn, nhưng cần đọc thêm file

## Open Questions

- Mirror sang `.claude/skills/` có cần thiết không? (Defer to later)
- Có cần thêm skill cho SSE vs WebSockets comparison? (Out of scope)
