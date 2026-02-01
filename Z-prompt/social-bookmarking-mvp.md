# Social Bookmarking trong MVP

Tài liệu tham chiếu: làm rõ phạm vi **Social Bookmarking** cho MVP của website mạng xã hội chia sẻ kiến thức (content-centric SNS).

---

## Bối cảnh

Mạng xã hội chia sẻ kiến thức (content-centric) cần **Social Bookmarking** để người dùng lưu trữ, quản lý và chia sẻ nội dung hữu ích. Trong MVP có thể triển khai theo mức độ sau:

## Các mức độ triển khai

| Mức độ | Nội dung | Mô tả | Ví dụ |
|--------|----------|--------|--------|
| **Tối thiểu (MVP v1)** | Lưu bài viết (Save post) | User bấm "Lưu" trên bài viết → lưu vào danh sách "Đã lưu" của mình. Có trang "Bài đã lưu" để xem lại. | Pinterest Save, Medium Bookmark |
| **Mở rộng (MVP v2)** | Bộ sưu tập (Collections) | Chia bài đã lưu thành nhiều bộ sưu tập (folder), đặt tên (vd: "React", "UX", "Đọc sau"). | Pinterest Boards, Notion databases |
| **Nâng cao (sau MVP)** | Lưu link ngoài + ghi chú | User thêm link từ web ngoài vào bộ sưu tập, kèm ghi chú. Có thể public bộ sưu tập để người khác xem. | Pocket, Raindrop.io |

## Phạm vi đề xuất cho MVP hiện tại

- **Có trong MVP:** **Lưu bài viết (Save post)** + trang **Bài đã lưu**.
  - Mỗi user có danh sách bài đã lưu (quan hệ User ↔ Post, many-to-many).
  - Trên bài viết: nút "Lưu" / "Bỏ lưu", trạng thái đã lưu hiển thị rõ.
  - Trên profile hoặc menu: mục "Bài đã lưu" → danh sách bài (có thể sort theo thời gian lưu).
- **Có thể để giai đoạn sau:** Collections (bộ sưu tập), lưu link ngoài, public collection, tag cá nhân cho bookmark.

## Lý do Social Bookmarking quan trọng với content-centric

- Người **tìm kiếm** kiến thức cần chỗ "để dành đọc sau" và ôn lại — tăng thời gian trên nền tảng và sự gắn bó.
- Người **chia sẻ** thấy bài được lưu nhiều → động lực tạo thêm nội dung chất lượng.
- Phù hợp định hướng **Social Bookmarking** (lưu trữ, quản lý, chia sẻ tài liệu/liên kết) trong phân loại content-centric đã chọn.

## Vị trí trong bảng MVP

Có thể thêm một dòng (ví dụ sau Search & Discovery hoặc trong nhóm "tương tác") — *Ví dụ: Thứ tự 9b — Lưu bài / Bookmark (Save post + trang Bài đã lưu).*

---

*Tham chiếu từ: [prompt.md](./prompt.md)*
