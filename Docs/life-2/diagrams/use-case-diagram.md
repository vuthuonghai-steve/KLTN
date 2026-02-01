# Use Case Diagram

> **Mục đích:** Actors và interactions với hệ thống  
> **Format:** Mermaid  

---

```mermaid
flowchart TB
    subgraph Actors
        Guest
        User
        Admin
    end
    
    subgraph "MVP Use Cases"
        UC1[Đăng nhập/Đăng ký]
        UC2[Quản lý Profile]
        UC3[Tạo/Sửa Post]
        UC4[Xem Feed]
        UC5[Like/Comment/Share]
        UC6[Bookmark]
        UC7[Tìm kiếm]
        UC8[Xem thông báo]
    end
    
    Guest --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
```

<!-- Mở rộng theo 10 MVP features: Auth, Profile, Posts, Feed, Interactions, Bookmark, Search, Notifications, Moderation, Privacy -->
