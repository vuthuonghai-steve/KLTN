## ADDED Requirements

### Requirement: Skill file structure
The sse-debugging skill SHALL be located at `.cursor/skills/sse-debugging/SKILL.md` with valid YAML frontmatter containing `name`, `description`, and `triggers` fields.

#### Scenario: Valid frontmatter structure
- **WHEN** AI agent reads the skill file
- **THEN** frontmatter MUST contain name: "sse-debugging", description about debugging SSE streams, and triggers array with keywords like "sse debug", "sse error", "sse reconnect"

### Requirement: Common issues documentation
The skill SHALL document common SSE issues including Vercel buffering, timeout disconnects, and reconnection failures in table format.

#### Scenario: Developer encounters buffering
- **WHEN** user reports "sse buffers all data"
- **THEN** skill explains Vercel delays stream issue and fix: use TransformStream + async work after return

#### Scenario: Developer encounters disconnect
- **WHEN** user reports "sse keeps disconnecting"
- **THEN** skill explains timeout cause and fix: add heartbeat sending `:\n\n` every 15-30 seconds

### Requirement: Heartbeat implementation template
The skill SHALL include a server-side heartbeat template with setInterval and proper cleanup.

#### Scenario: Add heartbeat to SSE
- **WHEN** user asks "add heartbeat to sse"
- **THEN** skill provides code with setInterval sending comment lines, and clearInterval on abort signal

#### Scenario: Heartbeat template file exists
- **WHEN** skill is loaded
- **THEN** templates/heartbeat.example.ts SHALL exist with heartbeat implementation

### Requirement: Client error handling template
The skill SHALL include client-side error handling with reconnection logic.

#### Scenario: Handle SSE errors
- **WHEN** user asks "handle sse errors"
- **THEN** skill provides onerror handler code with close, setTimeout retry, and exponential backoff suggestion

#### Scenario: Error handling template file exists
- **WHEN** skill is loaded
- **THEN** templates/client-error-reconnect.example.tsx SHALL exist with error handling code

### Requirement: AI debugging prompts
The skill SHALL include AI prompt examples for debugging SSE issues.

#### Scenario: User needs debug assistance
- **WHEN** user asks for AI help debugging SSE
- **THEN** skill suggests prompt like "Debug why SSE buffers all data until end in Next.js Vercel deploy"
