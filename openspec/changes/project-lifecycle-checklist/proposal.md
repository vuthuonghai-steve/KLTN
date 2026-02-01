## Why

Dự án Website Mạng Xã Hội Chia Sẻ Kiến Thức cần một **checklist vòng đời phát triển** có cấu trúc để:
- Định hướng rõ ràng công việc từng giai đoạn (từ ý tưởng đến verify)
- Tổ chức tài liệu kỹ thuật theo cấu trúc chuẩn, dễ tham chiếu
- AI agent có thể đọc specs từ giai đoạn thiết kế để sinh code chính xác
- Track progress với checklist có thể tick, đảm bảo không bỏ sót bước quan trọng

## What Changes

- **Định nghĩa 4 giai đoạn phát triển chính**: Định hướng → Phân tích Thiết kế → Triển khai → Verify
- **Thiết kế kiến trúc thư mục tài liệu** cho từng giai đoạn trong `Docs/life-1/`
- **Mapping 8 loại sơ đồ thiết kế** (ER, UseCase, Sequence, Flow, Class, DB Schema, UI Frame, API) vào giai đoạn 2
- **Tạo checklist actionable** với deliverables cụ thể cho từng giai đoạn
- **Tích hợp NotebookLM** làm nguồn tham khảo cho technical decisions

## Capabilities

### New Capabilities
- `lifecycle-planning`: Quản lý 4 giai đoạn phát triển với mục tiêu, checklist, và deliverables cụ thể
- `documentation-structure`: Kiến trúc thư mục tài liệu chuẩn cho dự án, phân chia theo giai đoạn
- `design-artifacts`: Đặc tả 8 loại sơ đồ thiết kế cần tạo trong giai đoạn Phân tích Thiết kế

### Modified Capabilities
<!-- Không có capabilities hiện tại cần modify -->

## Impact

- **Thư mục tài liệu**: Tạo cấu trúc mới trong `Docs/life-1/` với subdirectories cho từng giai đoạn
- **Development workflow**: Quy trình phát triển sẽ tuân theo 4 giai đoạn đã định nghĩa
- **AI agent integration**: Specs từ giai đoạn 2 sẽ là input cho code generation trong giai đoạn 3
- **NotebookLM**: Reference links được ghi chú để truy vấn khi cần chi tiết kỹ thuật
