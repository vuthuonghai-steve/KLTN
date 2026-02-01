## ADDED Requirements

### Requirement: Hệ thống phải định nghĩa 4 giai đoạn phát triển

Hệ thống quản lý vòng đời dự án SHALL bao gồm 4 giai đoạn chính với ranh giới rõ ràng:
1. **Giai đoạn 1 - Định hướng**: Xác định vision, requirements, và technical decisions
2. **Giai đoạn 2 - Phân tích Thiết kế**: Tạo các sơ đồ và specifications
3. **Giai đoạn 3 - Triển khai**: Coding, testing, và integration
4. **Giai đoạn 4 - Verify**: Review, QA, và documentation finalization

#### Scenario: Xác định giai đoạn hiện tại
- **WHEN** developer mở checklist-master.md
- **THEN** có thể xác định ngay giai đoạn hiện tại dựa trên checklist items đã hoàn thành

#### Scenario: Chuyển đổi giữa các giai đoạn
- **WHEN** tất cả checklist items của giai đoạn N được đánh dấu hoàn thành
- **THEN** giai đoạn N+1 được xem là ready để bắt đầu

---

### Requirement: Mỗi giai đoạn phải có checklist actionable

Mỗi giai đoạn MUST có checklist với các đặc điểm:
- Sử dụng Markdown checkbox format: `- [ ]` (chưa done) và `- [x]` (done)
- Mỗi item checklist phải atomic (một hành động cụ thể)
- Có thể estimate effort cho từng item

#### Scenario: Tracking progress trong giai đoạn
- **WHEN** developer hoàn thành một công việc
- **THEN** có thể tick checkbox tương ứng trong checklist
- **AND** tổng số items done/total được cập nhật

#### Scenario: Checklist không mơ hồ
- **WHEN** developer đọc một checklist item
- **THEN** có thể hiểu rõ cần làm gì mà không cần clarification

---

### Requirement: Mỗi giai đoạn phải có deliverables rõ ràng

Mỗi giai đoạn MUST định nghĩa:
- Danh sách deliverables (files/documents) cần tạo
- Đường dẫn file cụ thể trong cấu trúc thư mục
- Acceptance criteria cho mỗi deliverable

#### Scenario: Xác định deliverables cần tạo
- **WHEN** bắt đầu một giai đoạn mới
- **THEN** có danh sách rõ ràng các files cần tạo
- **AND** mỗi file có đường dẫn cụ thể (e.g., `phase-1-orientation/vision.md`)

#### Scenario: Verify deliverable hoàn thành
- **WHEN** tất cả deliverables của giai đoạn được tạo
- **THEN** giai đoạn có thể được đánh dấu hoàn thành

---

### Requirement: Giai đoạn 1 Định hướng phải bao gồm các nội dung cốt lõi

Giai đoạn 1 MUST tạo các tài liệu sau:
- **vision.md**: Tầm nhìn sản phẩm, target users, USP
- **requirements.md**: Functional và Non-functional requirements
- **tech-decisions.md**: Technology stack decisions với rationale

#### Scenario: Hoàn thành Giai đoạn 1
- **WHEN** tất cả 3 files (vision.md, requirements.md, tech-decisions.md) được tạo
- **THEN** Giai đoạn 1 được đánh dấu hoàn thành
- **AND** Giai đoạn 2 có đủ context để bắt đầu

---

### Requirement: Giai đoạn 2 Phân tích Thiết kế phải tạo 8 loại sơ đồ

Giai đoạn 2 MUST tạo các sơ đồ thiết kế với mức độ ưu tiên:

**Bắt buộc (P0):**
- ER Diagram
- Database Schema
- API Design

**Quan trọng (P1):**
- Use Case Diagram
- Sequence Diagrams (cho core flows)
- Flow Diagrams

**Tùy chọn (P2):**
- Class Diagram
- UI Wireframes

#### Scenario: Đủ specs cho code generation
- **WHEN** P0 diagrams (ER, DB Schema, API) được hoàn thành
- **THEN** AI agent có đủ thông tin để bắt đầu sinh code cho MVP

---

### Requirement: Giai đoạn 3 Triển khai phải spec-driven

Giai đoạn 3 MUST tham chiếu specs từ Giai đoạn 2 khi:
- Tạo database collections/models
- Implement API endpoints
- Xây dựng UI components

#### Scenario: Code sinh từ specs
- **WHEN** AI agent cần sinh code cho một feature
- **THEN** MUST đọc spec tương ứng từ phase-2-design/
- **AND** code output phải match với spec

#### Scenario: Spec thay đổi
- **WHEN** phát hiện spec cần sửa trong quá trình triển khai
- **THEN** MUST cập nhật spec trước khi sửa code
- **AND** document lý do thay đổi

---

### Requirement: Giai đoạn 4 Verify phải có review checklist

Giai đoạn 4 MUST verify:
- Code match với specs từ Giai đoạn 2
- Tất cả MVP features hoạt động đúng
- Documentation được cập nhật

#### Scenario: Verify code-spec alignment
- **WHEN** chạy review checklist
- **THEN** so sánh implementation với specs
- **AND** flag bất kỳ mismatch nào

#### Scenario: Hoàn thành verify
- **WHEN** tất cả items trong review-checklist.md được pass
- **THEN** dự án ready cho deployment/demo
