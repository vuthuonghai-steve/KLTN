---
name: "Apply: Barrel File Pattern"
description: Apply barrel file (index.ts) re-export conventions
category: Rules
tags: [conventions, barrel-files, structure]
---

Apply the Barrel File Pattern rule to project code.

**When to use:**
- Creating or modifying component, utility, hooks, or library directories
- Adding new files to directories that already have `index.ts`
- Reviewing file structure for proper re-exports

**What this rule covers:**

The Barrel File Pattern ensures:
- ✅ Import paths are clean: `@/components/ui` instead of `@/components/ui/Button`
- ✅ Public API is explicit and clear
- ✅ Tree-shaking works correctly
- ✅ Internal implementation details stay private

**Key guidelines:**

1. **File naming**: Use `index.ts` (TypeScript) or `index.js` (JavaScript)

2. **Re-export style** (pick one approach):
   ```typescript
   // ✅ PREFERRED – Explicit exports (best for tree-shaking)
   export { Button } from './Button';
   export { Input } from './Input';
   export type { ButtonProps } from './types';
   ```

   ```typescript
   // ⚠️ Use only for public subfolders with their own barrel
   export * from './subfolder';
   ```

   ```typescript
   // ❌ AVOID – Leaks internal APIs
   export * from './internal/helpers';
   export * from './Button';  // exports too much
   ```

3. **Directory scope** – Create barrels for:
   - `components/` and `components/ui/`
   - `utils/`
   - `hooks/`
   - `lib/`
   - `api/` or similar

4. **When adding files**: Update the existing `index.ts` if the new file is part of the public API

**Constraints:**
- ❌ Don't export internal helpers or private types
- ❌ Don't create deep chains: `barrel → barrel → barrel`
- ❌ Don't force barrel files for single-file directories (unless planned to grow)

**Related files:**
- `.claude/rules/Barrel-File-Pattern.rule.xml` (detailed XML rules)
- `.cursor/rules/barrel-file-pattern.mdc` (Cursor IDE version)
