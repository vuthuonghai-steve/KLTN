## ADDED Requirements

### Requirement: Kiến trúc thư mục phải theo giai đoạn

Tất cả tài liệu dự án MUST được tổ chức trong `Docs/life-1/` với cấu trúc:

```
Docs/life-1/
├── phase-1-orientation/
├── phase-2-design/
├── phase-3-implementation/
├── phase-4-verify/
└── checklist-master.md
```

#### Scenario: Tìm tài liệu theo giai đoạn
- **WHEN** developer cần tìm tài liệu thuộc Giai đoạn 2
- **THEN** navigate đến `Docs/life-1/phase-2-design/`
- **AND** tất cả tài liệu liên quan đến thiết kế nằm trong folder này

#### Scenario: Tạo tài liệu mới
- **WHEN** tạo tài liệu mới cho giai đoạn N
- **THEN** MUST đặt trong folder `phase-N-<name>/` tương ứng

---

### Requirement: Thư mục Giai đoạn 1 Định hướng

Folder `phase-1-orientation/` MUST chứa:

```
phase-1-orientation/
├── vision.md           # Tầm nhìn, target users, USP
├── requirements.md     # FR + NFR
└── tech-decisions.md   # Tech stack với rationale
```

#### Scenario: Tạo cấu trúc Giai đoạn 1
- **WHEN** bắt đầu Giai đoạn 1
- **THEN** tạo folder `phase-1-orientation/` với 3 files trống
- **AND** mỗi file có template header

---

### Requirement: Thư mục Giai đoạn 2 Phân tích Thiết kế

Folder `phase-2-design/` MUST chứa:

```
phase-2-design/
├── diagrams/
│   ├── er-diagram.md           # Mermaid ERD
│   ├── usecase-diagram.md      # Mermaid Use Case
│   ├── sequence-diagrams/      # Folder cho multiple sequences
│   │   └── auth-flow.md
│   ├── flow-diagrams/          # Folder cho business flows
│   │   └── post-creation.md
│   ├── class-diagram.md        # (Optional) Mermaid Class
│   ├── db-schema.md            # MongoDB collections
│   ├── ui-wireframes/          # Folder cho wireframes
│   │   └── home-feed.md
│   └── api-design.md           # API endpoints spec
└── design-decisions.md         # Key design decisions log
```

#### Scenario: Tổ chức sequence diagrams
- **WHEN** tạo sequence diagram cho một flow
- **THEN** tạo file trong `diagrams/sequence-diagrams/`
- **AND** tên file reflect flow name (e.g., `auth-flow.md`)

#### Scenario: Tổ chức UI wireframes
- **WHEN** tạo wireframe cho một screen
- **THEN** tạo file trong `diagrams/ui-wireframes/`
- **AND** có thể link đến Figma/Excalidraw nếu dùng external tool

---

### Requirement: Thư mục Giai đoạn 3 Triển khai

Folder `phase-3-implementation/` MUST chứa:

```
phase-3-implementation/
├── setup-guide.md          # Hướng dẫn setup môi trường
├── coding-conventions.md   # Code style, naming conventions
└── test-plans/             # Test cases và test reports
    └── unit-tests.md
```

#### Scenario: Developer mới onboard
- **WHEN** developer mới join dự án
- **THEN** đọc `setup-guide.md` để setup môi trường
- **AND** đọc `coding-conventions.md` để hiểu code style

---

### Requirement: Thư mục Giai đoạn 4 Verify

Folder `phase-4-verify/` MUST chứa:

```
phase-4-verify/
├── review-checklist.md     # Checklist verify code vs specs
└── qa-reports/             # QA findings và bug reports
    └── sprint-1-qa.md
```

#### Scenario: Chạy verify phase
- **WHEN** code implementation hoàn thành
- **THEN** dùng `review-checklist.md` để verify
- **AND** document findings trong `qa-reports/`

---

### Requirement: Checklist Master tổng hợp

File `checklist-master.md` MUST:
- Nằm ở root của `Docs/life-1/`
- Tổng hợp checklist từ tất cả 4 giai đoạn
- Hiển thị progress tổng thể (% completed)

#### Scenario: Xem tiến độ tổng thể
- **WHEN** mở `checklist-master.md`
- **THEN** thấy được tổng số tasks done/total cho mỗi giai đoạn
- **AND** có thể quick navigate đến giai đoạn cần làm

#### Scenario: Sync checklist
- **WHEN** update checklist trong một giai đoạn cụ thể
- **THEN** `checklist-master.md` SHOULD được update tương ứng
