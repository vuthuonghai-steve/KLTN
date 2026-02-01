## ADDED Requirements

### Requirement: Skill file structure
The sse-ai-optimization skill SHALL be located at `.cursor/skills/sse-ai-optimization/SKILL.md` with valid YAML frontmatter containing `name`, `description`, and `triggers` fields.

#### Scenario: Valid frontmatter structure
- **WHEN** AI agent reads the skill file
- **THEN** frontmatter MUST contain name: "sse-ai-optimization", description about using AI for SSE development, and triggers array with keywords like "sse ai", "ai sse", "optimize sse"

### Requirement: AI prompts collection
The skill SHALL include categorized AI prompts for Generate, Refactor, and Test scenarios.

#### Scenario: User wants to generate SSE
- **WHEN** user asks "ai prompt for sse"
- **THEN** skill provides prompt: "Create SSE prototype for news feed updates in Next.js with Vercel"

#### Scenario: User wants to refactor SSE
- **WHEN** user asks "ai refactor sse"
- **THEN** skill provides prompt: "Optimize SSE code for scaling with Redis in social app"

#### Scenario: User wants to test SSE
- **WHEN** user asks "ai test sse"
- **THEN** skill provides prompt: "Write Jest tests for SSE stream handling errors"

### Requirement: Prompts template file
The skill SHALL include a markdown file with organized prompts for copy-paste use.

#### Scenario: Prompts template file exists
- **WHEN** skill is loaded
- **THEN** templates/prompts.example.md SHALL exist with categorized prompts

### Requirement: AI benefits documentation
The skill SHALL document benefits of using AI for SSE development (time savings, auto-complete patterns, debug suggestions).

#### Scenario: User asks about AI benefits
- **WHEN** user asks "why use ai for sse"
- **THEN** skill explains: Cursor AI auto-completes SSE patterns, Claude suggests Vercel fixes, reduces dev time up to 70%

### Requirement: Agent chaining workflow
The skill SHALL document how to chain AI agents for SSE development (spec -> generate -> debug).

#### Scenario: User wants workflow
- **WHEN** user asks "ai workflow for sse"
- **THEN** skill explains: Use OpenSpec to create spec -> AI generates SSE code -> AI debugs issues

### Requirement: Example AI-generated test
The skill SHALL include an example of AI-generated test code for SSE.

#### Scenario: Show test example
- **WHEN** user asks "ai generated sse test"
- **THEN** skill provides example Jest test for SSE abort handling
