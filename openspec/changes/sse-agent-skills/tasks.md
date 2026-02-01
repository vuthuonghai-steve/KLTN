## 1. Setup Skill Directories

- [x] 1.1 Create directory `.cursor/skills/sse-basics/` with subdirectories `templates/` and `resources/`
- [x] 1.2 Create directory `.cursor/skills/sse-debugging/` with subdirectories `templates/` and `resources/`
- [x] 1.3 Create directory `.cursor/skills/sse-scaling/` with subdirectories `templates/` and `resources/`
- [x] 1.4 Create directory `.cursor/skills/sse-payload-integration/` with subdirectories `templates/` and `resources/`
- [x] 1.5 Create directory `.cursor/skills/sse-ai-optimization/` with subdirectories `templates/` and `resources/`

## 2. SSE Basics Skill

- [x] 2.1 Create `.cursor/skills/sse-basics/SKILL.md` with frontmatter (name, description, triggers) and core concepts documentation
- [x] 2.2 Create `.cursor/skills/sse-basics/templates/route-handler.example.ts` with TransformStream Route Handler code
- [x] 2.3 Create `.cursor/skills/sse-basics/templates/client-eventsource.example.tsx` with React EventSource component
- [x] 2.4 Create `.cursor/skills/sse-basics/resources/REFERENCES.md` with links to MDN SSE, Next.js Route Handlers docs

## 3. SSE Debugging Skill

- [x] 3.1 Create `.cursor/skills/sse-debugging/SKILL.md` with frontmatter and common issues table (buffering, timeout, reconnect)
- [x] 3.2 Create `.cursor/skills/sse-debugging/templates/heartbeat.example.ts` with setInterval heartbeat code
- [x] 3.3 Create `.cursor/skills/sse-debugging/templates/client-error-reconnect.example.tsx` with onerror handler and retry logic
- [x] 3.4 Create `.cursor/skills/sse-debugging/resources/REFERENCES.md` with links to Vercel streaming docs

## 4. SSE Scaling Skill

- [x] 4.1 Create `.cursor/skills/sse-scaling/SKILL.md` with frontmatter and scaling patterns documentation (Redis pub/sub, limits)
- [x] 4.2 Create `.cursor/skills/sse-scaling/templates/redis-subscribe.example.ts` with ioredis subscribe and stream write code
- [x] 4.3 Create `.cursor/skills/sse-scaling/resources/REFERENCES.md` with links to ioredis, Vercel Fluid Compute docs

## 5. SSE Payload Integration Skill

- [x] 5.1 Create `.cursor/skills/sse-payload-integration/SKILL.md` with frontmatter and Payload hooks documentation
- [x] 5.2 Create `.cursor/skills/sse-payload-integration/templates/after-change-hook.example.ts` with Payload afterChange hook code
- [x] 5.3 Create `.cursor/skills/sse-payload-integration/templates/route-with-auth.example.ts` with JWT-authenticated SSE route
- [x] 5.4 Create `.cursor/skills/sse-payload-integration/resources/REFERENCES.md` with links to Payload hooks docs

## 6. SSE AI Optimization Skill

- [x] 6.1 Create `.cursor/skills/sse-ai-optimization/SKILL.md` with frontmatter, AI prompts collection, and agent chaining workflow
- [x] 6.2 Create `.cursor/skills/sse-ai-optimization/templates/prompts.example.md` with categorized prompts (Generate, Refactor, Test)
- [x] 6.3 Create `.cursor/skills/sse-ai-optimization/resources/REFERENCES.md` with links to OpenSpec skills, AI tools

## 7. Verification

- [x] 7.1 Verify all 5 SKILL.md files have valid frontmatter structure
- [x] 7.2 Verify all template files are syntactically correct
- [x] 7.3 Verify triggers don't overlap excessively between skills
