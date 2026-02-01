## Context

Dự án Website Mạng Xã Hội Chia Sẻ Kiến Thức đang ở giai đoạn khởi tạo, cần một framework rõ ràng để:
- Tổ chức quy trình phát triển từ ý tưởng đến sản phẩm hoàn thiện
- Quản lý tài liệu kỹ thuật theo cấu trúc chuẩn
- Hỗ trợ AI agent tham chiếu specs để sinh code

**Current State:**
- Đã có roadmap tổng thể và MVP features list
- Đã research News Feed ranking algorithm
- Chưa có cấu trúc thư mục tài liệu chuẩn
- Chưa có checklist chi tiết cho từng giai đoạn

**Constraints:**
- Dự án demo, không production → đơn giản hóa quy trình
- Tech stack đã xác định: Next.js 15 + Payload CMS + MongoDB
- Docs root: `Docs/life-1/`

## Goals / Non-Goals

**Goals:**
- Định nghĩa 4 giai đoạn phát triển rõ ràng với ranh giới cụ thể
- Tạo kiến trúc thư mục tài liệu có thể mở rộng
- Checklist có thể tick (□/✓) để track progress
- Mapping 8 loại sơ đồ thiết kế vào đúng vị trí

**Non-Goals:**
- Không tạo nội dung chi tiết cho từng sơ đồ (chỉ định nghĩa vị trí và format)
- Không implement automated checklist tracking system
- Không áp dụng quy trình Agile/Scrum phức tạp (dự án demo cá nhân)

## Decisions

### Decision 1: Cấu trúc 4 Giai Đoạn

**Chọn:** 4 giai đoạn chính theo mô hình đơn giản hóa từ Quy trình 7 bước

| Giai đoạn | Mục tiêu | Tương ứng 7 bước |
|-----------|----------|------------------|
| 1. Định hướng | Vision, requirements, kim chỉ nam | Bước 1 |
| 2. Phân tích Thiết kế | 8 sơ đồ, database schema, API design | Bước 2 |
| 3. Triển khai | Coding, testing, spec-driven | Bước 3-4-5 |
| 4. Verify | Review, QA, documentation | Bước 6-7 |

**Rationale:** Dự án demo không cần granularity cao như production. 4 giai đoạn đủ để tracking mà không overhead.

**Alternatives considered:**
- 7 bước đầy đủ: Quá chi tiết cho dự án demo
- 3 giai đoạn (Plan-Build-Ship): Thiếu verify phase riêng

### Decision 2: Kiến trúc Thư Mục Tài Liệu

**Chọn:** Cấu trúc phẳng theo giai đoạn + loại tài liệu

```
Docs/life-1/
├── phase-1-orientation/      # Giai đoạn 1
│   ├── vision.md
│   ├── requirements.md
│   └── tech-decisions.md
├── phase-2-design/           # Giai đoạn 2
│   ├── diagrams/             # 8 sơ đồ
│   │   ├── er-diagram.md
│   │   ├── usecase-diagram.md
│   │   ├── sequence-diagrams/
│   │   ├── flow-diagrams/
│   │   ├── class-diagram.md
│   │   ├── db-schema.md
│   │   ├── ui-wireframes/
│   │   └── api-design.md
│   └── design-decisions.md
├── phase-3-implementation/   # Giai đoạn 3
│   ├── setup-guide.md
│   ├── coding-conventions.md
│   └── test-plans/
├── phase-4-verify/           # Giai đoạn 4
│   ├── review-checklist.md
│   └── qa-reports/
└── checklist-master.md       # Checklist tổng hợp
```

**Rationale:**
- Dễ navigate theo giai đoạn
- Tách biệt concerns rõ ràng
- AI agent dễ tìm đúng file theo context

### Decision 3: 8 Loại Sơ Đồ Thiết Kế

**Chọn:** 8 loại sơ đồ theo thứ tự tạo

| # | Sơ đồ | Format | Mục đích |
|---|-------|--------|----------|
| 1 | ER Diagram | Mermaid/PlantUML | Quan hệ entities |
| 2 | Use Case Diagram | Mermaid | Actor-system interactions |
| 3 | Sequence Diagrams | Mermaid | Flow cho từng use case |
| 4 | Flow Diagrams | Mermaid | Business logic flows |
| 5 | Class Diagram | Mermaid | OOP structure (nếu cần) |
| 6 | Database Schema | Markdown + JSON | MongoDB collections |
| 7 | UI Wireframes | Figma/Excalidraw | Screen layouts |
| 8 | API Design | OpenAPI/Markdown | Endpoints specification |

**Rationale:** Thứ tự này đảm bảo dependencies: ER → Use Case → Sequence → Flow → Class → DB → UI → API

### Decision 4: Checklist Format

**Chọn:** Markdown checkbox với status tracking

```markdown
## Phase 1: Định hướng

### Checklist
- [x] Xác định vision và scope
- [ ] Viết requirements document
- [ ] Document tech decisions

### Deliverables
| File | Status | Notes |
|------|--------|-------|
| vision.md | ✓ Done | |
| requirements.md | In Progress | |
```

**Rationale:**
- Compatible với Git (diff-able)
- Có thể render trên GitHub/VS Code
- Dễ parse cho automation sau này

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Over-documentation | Tốn thời gian, paralysis by analysis | Chỉ tạo docs khi cần, iterative approach |
| Thư mục structure phức tạp | Khó navigate | Giữ flat structure, max 2 levels deep |
| Checklist không update | Outdated, mất giá trị | Review checklist mỗi sprint/phase |
| 8 sơ đồ quá nhiều cho demo | Chưa cần hết | Ưu tiên: ER, DB Schema, API → tạo trước, còn lại optional |

## Open Questions

1. **Sơ đồ nào là bắt buộc?** → Đề xuất: ER, DB Schema, API Design là bắt buộc. UI Wireframes tùy chọn.
2. **Có cần version control cho diagrams?** → Đề xuất: Dùng text-based (Mermaid) để Git có thể track changes.
3. **Checklist master nên auto-generate hay manual?** → Bắt đầu manual, automate sau nếu cần.
