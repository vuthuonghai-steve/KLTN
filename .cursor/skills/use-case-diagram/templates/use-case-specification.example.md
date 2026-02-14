# Mẫu Use Case Specification

> Dùng kèm biểu đồ Use Case để đặc tả chi tiết từng ca sử dụng (Main Flow, Exception).

---

## Use Case: Đăng nhập

| Mục | Nội dung |
|-----|----------|
| **Tên UC** | UC01 - Đăng nhập |
| **Tác nhân** | Admin, User |
| **Tiền điều kiện** | Người dùng chưa đăng nhập, đang ở trang Login |
| **Hậu điều kiện** | Đăng nhập thành công, chuyển đến trang chủ |
| **Trigger** | Người dùng truy cập trang đăng nhập |

### Main Flow
1. Người dùng nhập username và password
2. Người dùng nhấn nút "Đăng nhập"
3. Hệ thống kiểm tra thông tin
4. Hệ thống xác thực thành công
5. Hệ thống chuyển đến trang chủ

### Exception
- **3a.** Sai username/password:
  - 3a1. Hệ thống hiển thị thông báo lỗi
  - 3a2. Quay lại bước 1
- **3b.** Tài khoản bị khóa:
  - 3b1. Hệ thống thông báo tài khoản bị khóa
  - 3b2. Kết thúc Use Case

---

## Template trống (copy để tạo UC mới)

```markdown
## Use Case: [Tên chức năng]

| Mục | Nội dung |
|-----|----------|
| **Tên UC** | UCxx - [Tên] |
| **Tác nhân** | [Actor chính] |
| **Tiền điều kiện** | [Điều kiện trước khi thực hiện] |
| **Hậu điều kiện** | [Kết quả sau khi thành công] |
| **Trigger** | [Sự kiện bắt đầu] |

### Main Flow
1. [Bước 1]
2. [Bước 2]
3. ...

### Exception
- **[Bước]a.** [Tình huống lỗi]:
  - [Xử lý]
- **[Bước]b.** [Tình huống khác]: ...
```
