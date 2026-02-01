## ADDED Requirements

### Requirement: Skill file structure
The sse-scaling skill SHALL be located at `.cursor/skills/sse-scaling/SKILL.md` with valid YAML frontmatter containing `name`, `description`, and `triggers` fields.

#### Scenario: Valid frontmatter structure
- **WHEN** AI agent reads the skill file
- **THEN** frontmatter MUST contain name: "sse-scaling", description about scaling SSE for production, and triggers array with keywords like "sse scale", "sse production", "sse redis"

### Requirement: Scaling patterns documentation
The skill SHALL document SSE scaling patterns including Redis pub/sub for fan-out and platform limits (Vercel Pro 60s timeout).

#### Scenario: Developer asks about scaling
- **WHEN** user asks "how to scale sse"
- **THEN** skill explains fan-out pattern with Redis pub/sub and mentions Vercel Fluid Compute for extended timeouts

### Requirement: Redis integration template
The skill SHALL include Redis pub/sub integration template using ioredis for broadcasting events.

#### Scenario: Add Redis to SSE
- **WHEN** user asks "integrate redis with sse"
- **THEN** skill provides code with ioredis subscribe, message handler writing to stream, and cleanup

#### Scenario: Redis template file exists
- **WHEN** skill is loaded
- **THEN** templates/redis-subscribe.example.ts SHALL exist with complete Redis integration code

### Requirement: Concurrent connection handling
The skill SHALL document strategies for handling 100+ concurrent SSE connections.

#### Scenario: Handle many connections
- **WHEN** user asks "sse 100 users"
- **THEN** skill explains connection pooling, Redis broadcast, and memory considerations

### Requirement: AI scaling prompts
The skill SHALL include AI prompt examples for scaling SSE.

#### Scenario: User needs scaling assistance
- **WHEN** user asks for AI help scaling SSE
- **THEN** skill suggests prompt like "Refactor SSE with Redis pub/sub for 100 concurrent notifications in Next.js social network"
