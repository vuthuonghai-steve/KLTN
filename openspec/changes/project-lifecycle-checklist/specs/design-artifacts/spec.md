## ADDED Requirements

### Requirement: ER Diagram phải định nghĩa entities và relationships

ER Diagram (Entity-Relationship) MUST:
- Sử dụng Mermaid erDiagram syntax
- Định nghĩa tất cả entities chính của hệ thống
- Chỉ rõ relationships (1:1, 1:N, M:N)
- Liệt kê key attributes cho mỗi entity

#### Scenario: Tạo ER Diagram cho Social Network
- **WHEN** thiết kế ER diagram
- **THEN** bao gồm entities: User, Post, Comment, Like, Bookmark, Follow, Notification, Message
- **AND** định nghĩa relationships giữa các entities

#### Scenario: Sử dụng ER cho DB design
- **WHEN** thiết kế Database Schema
- **THEN** tham chiếu ER Diagram để đảm bảo consistency
- **AND** mỗi entity map sang một MongoDB collection

---

### Requirement: Use Case Diagram phải định nghĩa actors và interactions

Use Case Diagram MUST:
- Sử dụng Mermaid hoặc PlantUML syntax
- Xác định tất cả actors (User types, Admin, System)
- Liệt kê use cases cho MVP features
- Chỉ rõ relationships (includes, extends)

#### Scenario: Định nghĩa Use Cases cho MVP
- **WHEN** tạo Use Case Diagram
- **THEN** bao gồm use cases cho 10 MVP features
- **AND** group by actor (Guest, Authenticated User, Admin)

---

### Requirement: Sequence Diagrams phải mô tả flow chi tiết

Mỗi Sequence Diagram MUST:
- Mô tả một flow cụ thể (authentication, post creation, etc.)
- Sử dụng Mermaid sequenceDiagram syntax
- Bao gồm: participants, messages, alt/opt blocks
- Specify API calls và DB operations

#### Scenario: Tạo Sequence cho Authentication Flow
- **WHEN** tạo sequence diagram cho auth
- **THEN** bao gồm: Client → API → Auth Service → Database
- **AND** cover cả success và error paths

#### Scenario: Minimum Sequences cần thiết
- **WHEN** hoàn thành Giai đoạn 2
- **THEN** MUST có sequence diagrams cho: Authentication, Post Creation, News Feed Load, Bookmark Save

---

### Requirement: Flow Diagrams phải mô tả business logic

Flow Diagrams MUST:
- Sử dụng Mermaid flowchart syntax
- Mô tả decision points và branches
- Chỉ rõ start/end states
- Include error handling flows

#### Scenario: Flow cho News Feed Ranking
- **WHEN** tạo flow diagram cho News Feed
- **THEN** mô tả: Trigger → Calculate Score → Sort → Cache → Return
- **AND** include time-decay logic

---

### Requirement: Database Schema phải định nghĩa collections chi tiết

Database Schema document MUST:
- Liệt kê tất cả MongoDB collections
- Định nghĩa fields với types cho mỗi collection
- Specify indexes cần thiết
- Document relationships (references, embedded)

#### Scenario: Định nghĩa Posts collection
- **WHEN** thiết kế Posts collection
- **THEN** include: _id, author (ref), content, media, tags, votesCount, commentsCount, savesCount, rankingScore, createdAt, updatedAt
- **AND** specify indexes: {rankingScore: -1}, {author: 1, createdAt: -1}

#### Scenario: Schema format
- **WHEN** document collection schema
- **THEN** sử dụng format:
```
Collection: posts
Fields:
  - _id: ObjectId (auto)
  - author: ObjectId (ref: users)
  - content: String (required)
  ...
Indexes:
  - { rankingScore: -1, createdAt: -1 }
```

---

### Requirement: UI Wireframes phải định nghĩa screen layouts

UI Wireframes MUST:
- Định nghĩa layout cho các screens chính
- Có thể là: ASCII art, Mermaid, hoặc link đến Figma
- Specify components và vị trí
- Note responsive behavior

#### Scenario: Wireframe cho Home Feed
- **WHEN** tạo wireframe cho home feed
- **THEN** include: Header, Sidebar (nếu có), Feed list, Post card layout
- **AND** note scroll behavior và pagination

#### Scenario: Optional external tool
- **WHEN** dùng Figma/Excalidraw cho wireframes
- **THEN** embed link trong markdown file
- **AND** include screenshot/export nếu cần offline reference

---

### Requirement: API Design phải định nghĩa endpoints đầy đủ

API Design document MUST:
- Liệt kê tất cả API endpoints
- Specify method, path, request/response format
- Document authentication requirements
- Include error responses

#### Scenario: Định nghĩa Posts API
- **WHEN** thiết kế Posts API
- **THEN** include endpoints:
  - GET /api/posts (list/feed)
  - POST /api/posts (create)
  - GET /api/posts/:id (detail)
  - PATCH /api/posts/:id (update)
  - DELETE /api/posts/:id (delete)
- **AND** mỗi endpoint có request/response schema

#### Scenario: API format
- **WHEN** document một endpoint
- **THEN** sử dụng format:
```
### POST /api/posts
**Description:** Create a new post
**Auth:** Required (JWT)
**Request Body:**
  - content: string (required)
  - media: string[] (optional)
  - tags: string[] (optional)
**Response 201:**
  - id: string
  - createdAt: ISO8601
**Errors:**
  - 401: Unauthorized
  - 400: Validation error
```

---

### Requirement: Diagrams phải sử dụng text-based format khi có thể

Tất cả diagrams SHOULD:
- Ưu tiên Mermaid syntax (Git-trackable)
- Có thể render trong VS Code và GitHub
- Fallback đến PlantUML nếu Mermaid không hỗ trợ
- Include raw code trong markdown code blocks

#### Scenario: Version control cho diagrams
- **WHEN** update một diagram
- **THEN** Git có thể show diff của thay đổi
- **AND** review được trong PR

#### Scenario: Render diagrams
- **WHEN** mở file diagram trong VS Code
- **THEN** có thể preview Mermaid diagrams với extension
