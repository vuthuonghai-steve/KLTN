# Use Case Diagram - Tài nguyên nghiên cứu

> **Nguồn**: NotebookLM - https://notebooklm.google.com/notebook/46ddeb54-c391-43df-95f2-53c820428ada
> **Ngày tạo**: 2026-02-02
> **Tham chiếu repo**: Docs/diagram/use-case-diagram-research.md

---

## 1. Lý thuyết

### 1.1 Khái niệm
**Use Case Diagram (Biểu đồ ca sử dụng)** là một loại biểu đồ thuộc nhóm Mô hình hóa hành vi (Behavioral Modeling) trong UML.

- **Định nghĩa**: Biểu đồ mô tả sự tương tác giữa các tác nhân bên ngoài (actors) và hệ thống thông qua các ca sử dụng (use cases).
- **Bản chất**: Thể hiện các chức năng, nhiệm vụ của hệ thống dưới góc độ của người sử dụng.

### 1.2 Mục đích sử dụng
- **Thể hiện yêu cầu hệ thống**: Mô tả mọi yêu cầu chức năng của hệ thống
- **Mô tả tương tác**: Xác định ai (tác nhân) sẽ thực hiện hành động gì với hệ thống
- **Định hình chức năng**: Xác định danh sách tính năng (Đăng nhập, Quản lý người dùng, Quản lý bài viết...)
- **Cung cấp Use Case View**: Một trong 5 góc nhìn quan trọng trong kiến trúc UML

### 1.3 Khi nào dùng?

| Giai đoạn | Mô tả |
|-----------|-------|
| **Sau khảo sát** | Sau khi tìm hiểu User Personas, dùng Use Case để cụ thể hóa yêu cầu |
| **Trước thiết kế chi tiết** | Xác định phạm vi chức năng trước khi vẽ Class Diagram, Sequence Diagram |
| **Giai đoạn Phân tích & Thiết kế** | Là trọng tâm của Analysis & Design phase |

### 1.4 Vai trò trong quy trình phát triển

**Cơ sở cho các biểu đồ khác**:
- **Sequence Diagram**: Mô tả trình tự thực hiện của một Use Case cụ thể
- **Class Diagram**: Thiết kế các lớp cần thiết để thực thi Use Case
- **Collaboration Diagram**: Biểu diễn kịch bản khai thác của Use Case

---

## 2. Cấu trúc

### 2.1 Ký hiệu các thành phần

| Thành phần | Ký hiệu | Mô tả |
|------------|---------|-------|
| **Actor** | Hình người que | Người dùng hoặc hệ thống bên ngoài |
| **Use Case** | Hình bầu dục (ellipse) | Chức năng cụ thể của hệ thống |
| **System Boundary** | Hình chữ nhật | Phạm vi của hệ thống |
| **Association** | Đường liền nét | Tương tác Actor - Use Case |
| **Include** | Đường nét đứt + `<<include>>` | Bắt buộc phải thực hiện |
| **Extend** | Đường nét đứt + `<<extend>>` | Tùy chọn, có điều kiện |
| **Generalization** | Đường liền + mũi tên tam giác rỗng | Kế thừa |

### 2.2 Các loại quan hệ

- **Association**: Actor ─────────── Use Case (Actor tham gia Use Case)
- **Include**: Base UC - - - - - -> Included UC `<<include>>` (bắt buộc)
- **Extend**: Extension UC - - - - -> Base UC `<<extend>>` (tùy chọn)
- **Generalization**: Actor con ◁─────── Actor cha (kế thừa quyền)

### 2.3 Cú pháp Mermaid (useCaseDiagram)

```mermaid
useCaseDiagram
    actor "Khách hàng" as User
    actor "Hệ thống Ngân hàng" as BankSys
    package "Hệ thống ATM" {
        usecase "Rút tiền" as UC1
        usecase "Kiểm tra số dư" as UC2
        usecase "Xác thực PIN" as UC3
        usecase "In hóa đơn" as UC4
    }
    User --> UC1
    User --> UC2
    UC1 ..> UC3 : <<include>>
    UC4 ..> UC1 : <<extend>>
    UC1 --> BankSys
```

---

## 3. Cách thức xây dựng

### 3.1 Quy trình 5 bước

1. **Xác định Actors** – Ai sử dụng hệ thống? Hệ thống nào tương tác? (Vai trò, không phải cá nhân.)
2. **Xác định Use Cases** – Từ yêu cầu chức năng; **Động từ + Danh từ** (VD: Đăng nhập, Thêm chuyên mục).
3. **Xác định Quan hệ** – Association (actor–UC); Include (bắt buộc); Extend (tùy chọn); Generalization (actor).
4. **Vẽ System Boundary** – Hình chữ nhật bao quanh Use Cases; Actors ngoài.
5. **Kiểm tra** – Mỗi UC mang lại giá trị cho Actor; kiểm tra Main flow và Exception.

### 3.2 Best Practices

| Nên làm | Không nên làm |
|---------|---------------|
| Đặt tên: **Động từ + Danh từ** | Đặt tên chỉ có danh từ |
| Gom các bước nhỏ thành UC lớn | Vẽ "Nhập username", "Nhập password" riêng |
| Kèm bảng đặc tả Use Case | Chỉ có hình vẽ không có mô tả |
| Phân rã UC quá lớn | Để UC "Quản lý hệ thống" quá chung |
| Phân biệt Include vs Extend | Nhầm lẫn bắt buộc vs tùy chọn |

---

## 4. Cách đọc biểu đồ

**Câu hỏi chính**: "Ai (Actor) đang làm gì (Use Case) với hệ thống?"

| Nhìn thấy | Hiểu là |
|-----------|---------|
| Đường liền nét Actor → UC | Actor tham gia vào chức năng này |
| `<<include>>` A → B | Để làm A, **bắt buộc** phải chạy B |
| `<<extend>>` B → A | Khi làm A, **có thể** làm thêm B (tùy chọn) |
| Mũi tên tam giác Actor con → Actor cha | Actor con kế thừa mọi quyền của cha |

---

## 5. Use Case Specification (Đặc tả Use Case)

| Mục | Mô tả |
|-----|-------|
| **Tên Use Case** | Tên chức năng |
| **Tác nhân chính** | Actor thực hiện |
| **Tiền điều kiện** | Điều kiện cần có trước |
| **Hậu điều kiện** | Kết quả sau khi thực hiện |
| **Trigger** | Sự kiện bắt đầu |
| **Main Flow** | Các bước chính |
| **Exception** | Tình huống lỗi |

Mẫu chi tiết xem: [templates/use-case-specification.example.md](../templates/use-case-specification.example.md).

---

*Tài liệu tổng hợp từ NotebookLM – "Mô hình hóa cấu trúc", "Đồ án tốt nghiệp xây dựng website"*
