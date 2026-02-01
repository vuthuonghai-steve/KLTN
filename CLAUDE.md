---
description: 
alwaysApply: true
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **OpenSpec-based spec-driven development project** configured for AI-assisted feature development. Work is organized around explicit specifications and artifacts that guide implementation, rather than starting directly with code.

## Common Development Commands

### Starting New Work

```bash
# Start a new feature/change (step-by-step artifact workflow)
/opsx:new my-feature-name

# Or fast-forward mode (create all artifacts at once)
/opsx:ff my-feature-name

# Interactive tutorial for first-time users
/opsx:onboard
```

### During Development

```bash
# Continue to next artifact in workflow
/opsx:continue my-feature-name

# Implement tasks defined in change artifacts
/opsx:apply my-feature-name

# Explore/think through problems without committing to changes
/opsx:explore
```

### Completing Work

```bash
# Verify implementation matches specs before archiving
/opsx:verify my-feature-name

# Sync delta specs (change-specific specs) into main specs
/opsx:sync my-feature-name

# Archive completed change to history
/opsx:archive my-feature-name

# Batch archive multiple changes with conflict resolution
/opsx:bulk-archive
```

## High-Level Architecture

### Workflow Phases

The OpenSpec workflow follows these phases:

1. **Exploration** (`/opsx:explore`)
   - Thinking mode for understanding problems
   - No artifact changes, purely analytical
   - Can read codebase and existing artifacts

2. **Artifact Creation** (`/opsx:new` or `/opsx:ff`)
   - Creates structured artifacts in dependency order:
     - `proposal.md` - What/why (one-page overview)
     - `specs/<capability>/spec.md` - Detailed requirements (delta spec, merged into main specs on archive)
     - `design.md` - How and why decisions
     - `tasks.md` - Implementation steps

3. **Implementation** (`/opsx:apply`)
   - Read artifacts as context
   - Implement tasks sequentially
   - Can update artifacts if issues discovered
   - Mark tasks complete as you go

4. **Verification** (`/opsx:verify`)
   - Check task completion (all done?)
   - Verify spec coverage (all requirements implemented?)
   - Verify design adherence
   - Reports CRITICAL/WARNING/SUGGESTION issues

5. **Spec Sync & Archive** (`/opsx:sync` + `/opsx:archive`)
   - Merge change-specific specs into main specs
   - Move change to archive with decision history preserved

### Directory Structure

```
openspec/
├── config.yaml                 # Project configuration (schema, context, rules)
├── specs/                      # Main specifications (merged from all changes)
│   └── <capability>/spec.md    # Per-capability specification
├── changes/                    # Active work-in-progress changes
│   ├── <change-name>/          # Each change is a directory
│   │   ├── proposal.md
│   │   ├── design.md
│   │   ├── tasks.md
│   │   ├── specs/              # Delta specs (change-specific, merged on archive)
│   │   │   └── <capability>/spec.md
│   │   └── .openspec.yaml      # Change metadata
│   └── archive/                # Completed changes (historical records)
│       └── YYYY-MM-DD-<change-name>/
.claude/                        # Claude Code configuration
├── skills/                     # AI agent skills for OpenSpec commands
└── commands/                   # Command shortcuts

.cursor/                        # Cursor IDE configuration (mirrored from .claude/)
├── skills/
└── commands/

.mcp.json                       # MCP server configuration (shared with team)
```

### Artifact Dependency Graph

```
proposal
    ↓
specs ←─────────────┐
    ↓              │
design ←───────────┘
    ↓
tasks ← (ready for implementation)
```

Requirements: All artifacts must be created before `/opsx:apply` can run.

### Key Patterns

**Spec-First Mentality**: Always define what and why (specs) before how (implementation)

**Delta Specs**: Changes define only what's new/modified. Main specs are intelligently merged from all changes, preserving existing requirements.

**Fluid Implementation**: While `/opsx:apply` executes tasks sequentially, you can update artifact content if issues are discovered during implementation (not phase-locked).

**Decision Preservation**: Archived changes serve as historical records of decisions, not just final code. Useful for understanding why decisions were made.

**AI-Assisted Orchestration**: Skills intelligently merge specs, detect/resolve conflicts in bulk operations, and verify implementation coverage.

## MCP Servers (Integration Tools)

The following MCP servers are configured and available:

1. **Context7** (`plugin:context7:context7`)
   - Query documentation and code examples for any library
   - Use: Look up API documentation, find code patterns
   - Commands: `resolve-library-id`, `query-docs`

2. **Pencil** (Design editor)
   - Read/write to `.pen` design files
   - Use: Create UI mockups, design system work
   - Commands: `batch_get`, `batch_design`, `get_screenshot`, etc.

3. **Anthropic Docs MCP** (`julianoczkowski-anthropic-docs-mcp-ts`)
   - Access Anthropic documentation
   - Use: Look up Claude API, Agent SDK, model capabilities

## Configuration Notes

- **Schema**: `spec-driven` (default OpenSpec workflow)
- **Project Context**: Currently empty in `openspec/config.yaml` - add your tech stack, conventions, and domain knowledge for better artifact generation
- **Custom Rules**: Can be added per-artifact type in `config.yaml` (e.g., "Keep proposals under 500 words")

## For Future Instances

To improve future Claude Code sessions in this repository:

1. **Add project context** to `openspec/config.yaml` with your tech stack, naming conventions, and domain knowledge
2. **Define artifact rules** if you have preferences (e.g., task granularity, spec format)
3. **Archive mature changes** to keep `/openspec/changes/` organized (prevents clutter, preserves decision history)
4. **Review main specs** in `/openspec/specs/` periodically to ensure they stay current with implementation
