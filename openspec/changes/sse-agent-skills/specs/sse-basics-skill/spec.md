## ADDED Requirements

### Requirement: Skill file structure
The sse-basics skill SHALL be located at `.cursor/skills/sse-basics/SKILL.md` with valid YAML frontmatter containing `name`, `description`, and `triggers` fields.

#### Scenario: Valid frontmatter structure
- **WHEN** AI agent reads the skill file
- **THEN** frontmatter MUST contain name: "sse-basics", description explaining core SSE implementation, and triggers array with keywords like "sse basics", "implement sse", "sse setup"

### Requirement: Core concepts documentation
The skill SHALL document SSE core concepts including unidirectional communication, text/event-stream format, and auto-reconnect behavior.

#### Scenario: Developer asks about SSE basics
- **WHEN** user triggers skill with "explain sse basics"
- **THEN** skill provides explanation of one-way server-to-client communication, message format ending with `\n\n`, and built-in retry mechanism

### Requirement: Server-side implementation template
The skill SHALL include a Route Handler template using TransformStream/ReadableStream pattern for Next.js App Router.

#### Scenario: Generate SSE endpoint
- **WHEN** user asks "create sse endpoint"
- **THEN** skill provides TypeScript code template with TransformStream, TextEncoder, correct headers (`Content-Type: text/event-stream`), and proper stream writing

#### Scenario: Template file exists
- **WHEN** skill is loaded
- **THEN** templates/route-handler.example.ts SHALL exist with complete Route Handler code

### Requirement: Client-side implementation template
The skill SHALL include an EventSource client template with proper connection handling and cleanup.

#### Scenario: Generate SSE client
- **WHEN** user asks "create sse client"
- **THEN** skill provides React component with useEffect, EventSource initialization, onmessage handler, and cleanup on unmount

#### Scenario: Client template file exists
- **WHEN** skill is loaded
- **THEN** templates/client-eventsource.example.tsx SHALL exist with complete React component code

### Requirement: AI prompt suggestions
The skill SHALL include AI prompt examples for generating SSE code.

#### Scenario: User needs AI assistance
- **WHEN** user asks for AI help with SSE
- **THEN** skill suggests prompt like "Generate basic SSE endpoint in Next.js for social notifications"
