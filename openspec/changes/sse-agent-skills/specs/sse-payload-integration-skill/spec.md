## ADDED Requirements

### Requirement: Skill file structure
The sse-payload-integration skill SHALL be located at `.cursor/skills/sse-payload-integration/SKILL.md` with valid YAML frontmatter containing `name`, `description`, and `triggers` fields.

#### Scenario: Valid frontmatter structure
- **WHEN** AI agent reads the skill file
- **THEN** frontmatter MUST contain name: "sse-payload-integration", description about Payload CMS integration, and triggers array with keywords like "sse payload", "sse cms", "sse hooks"

### Requirement: Payload hooks documentation
The skill SHALL document how to use Payload CMS afterChange hook to trigger SSE events.

#### Scenario: Developer asks about hook pattern
- **WHEN** user asks "trigger sse from payload"
- **THEN** skill explains afterChange hook pattern: detect change, call triggerNotification function, emit event

### Requirement: afterChange hook template
The skill SHALL include a Payload collection hook template that triggers SSE events.

#### Scenario: Create hook for likes
- **WHEN** user asks "create payload hook for likes"
- **THEN** skill provides afterChange hook code checking likesCount change and calling triggerNotification

#### Scenario: Hook template file exists
- **WHEN** skill is loaded
- **THEN** templates/after-change-hook.example.ts SHALL exist with Payload hook implementation

### Requirement: Authenticated route template
The skill SHALL include an SSE route template with JWT verification and EventEmitter integration.

#### Scenario: Create authenticated SSE endpoint
- **WHEN** user asks "sse with auth"
- **THEN** skill provides route code with JWT verification, EventEmitter listener, heartbeat, and abort cleanup

#### Scenario: Auth route template file exists
- **WHEN** skill is loaded
- **THEN** templates/route-with-auth.example.ts SHALL exist with authenticated route code

### Requirement: Full flow documentation
The skill SHALL document the complete flow from Payload hook to client notification.

#### Scenario: Understand full flow
- **WHEN** user asks "sse payload flow"
- **THEN** skill explains: Hook detects change -> Publish event -> SSE handler subscribes -> Stream to connected clients

### Requirement: AI integration prompts
The skill SHALL include AI prompt examples for Payload SSE integration.

#### Scenario: User needs integration assistance
- **WHEN** user asks for AI help with Payload SSE
- **THEN** skill suggests prompt like "Generate Payload afterChange hook + SSE trigger for realtime like notifications in social app"
