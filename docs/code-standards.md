# Code Standards - bandoxaynha.ai

**Version**: 1.0
**Last Updated**: 2025-12-11
**Scope**: TypeScript, React, Next.js

---

## Overview

Enforces consistent code quality, maintainability, and developer experience across bandoxaynha.ai platform.

## Language & Runtime Standards

### TypeScript Configuration
- **Strict Mode**: Enforced in `tsconfig.json`
  - `strict: true` (all strict checks enabled)
  - `noImplicitAny: true` (types required)
  - `strictNullChecks: true` (null safety)
  - `strictFunctionTypes: true` (function type safety)
- **Target**: ES2020 (modern browser support)
- **Module Resolution**: bundler (Next.js)
- **No `any` Types**: Without explicit justification in comments

### File Naming Conventions
- **Components**: PascalCase (`Button.tsx`, `HomePage.tsx`)
- **Utils/Helpers**: camelCase (`cn.ts`, `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL.ts`)
- **Directories**: kebab-case or camelCase (`components/ui/`, `lib/utils/`)

### Import Standards
- Use `@/` path alias for project imports
- Alphabetical ordering within groups:
  ```tsx
  // 1. React/Next.js imports
  import React from "react";
  import { ReactNode } from "react";

  // 2. External library imports
  import { Button } from "@radix-ui/react-button";
  import { cn } from "clsx";

  // 3. Internal imports
  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";
  ```

---

## React & Component Standards

### Component Structure
- **Functional Components**: Use React.FC or explicit return types
- **Ref Forwarding**: Use `React.forwardRef()` when needed
- **Props Type Definition**:
  ```tsx
  interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "primary" | "secondary";
    disabled?: boolean;
  }

  const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("base", className)} {...props} />
    )
  );
  Component.displayName = "Component";
  export { Component };
  ```

### Component Organization
- Components live in `components/` directory
- UI components in `components/ui/`
- Feature components in `components/features/`
- Each component self-contained with related exports
- Exports: component, types, variants (if using CVA)

### Props Patterns
- All props explicitly typed
- Spread `...props` for native attribute pass-through
- Document variant/size options as string literals
- Include `className` prop for customization
- Use composition over complex prop combinations

### Hooks Standards
- Place hook definitions before component body
- Extract custom hooks to `lib/hooks/`
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Prefer composition over complex useEffect chains

---

## Styling Standards

### Tailwind CSS Usage
- Utility-first approach
- Avoid inline styles in favor of Tailwind
- Use design tokens from `tailwind.config.ts`
  ```tsx
  <button className="bg-brand-green hover:bg-brand-darkGreen">
  <div className="text-neutralGray">
  ```

### Design Tokens
Access colors/fonts from config:
- **Primary**: `bg-brand-green`, `text-brand-blue`
- **Neutral**: `text-neutralGray`, `bg-lightGray`
- **Fonts**: `font-sans` (Inter), `font-montserrat`
- **Spacing**: Use Tailwind scale (p-4, m-2, gap-3)
- **Border Colors**: Default to `border-silverBorder`

### Class Variance Authority (CVA)
For component variants:
```tsx
const buttonVariants = cva(
  "base classes",
  {
    variants: {
      variant: {
        default: "...",
        secondary: "..."
      },
      size: {
        sm: "...",
        lg: "..."
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
```

### Class Name Merging
Always use `cn()` utility:
```tsx
import { cn } from "@/lib/utils";

const element = cn(
  "base-classes",
  isActive && "active-classes",
  customClass
);
```

---

## State Management

### Current Approach
- React Context for simple state (future)
- Props drilling for component hierarchies
- Local state with `useState` for component-level data

### Future Standards
- Document state management pattern adoption
- Update when Redux/Zustand/Jotai implemented

---

## API & Networking

### Standards (To Be Defined)
- Centralized API client in `lib/api/`
- Environment variables for endpoints
- Error handling patterns
- Request/response types
- Retry logic for failed requests

---

## Error Handling

### Best Practices
- Never silently fail operations
- Log errors to console in development
- Provide user-friendly error messages
- Use error boundaries for React errors
- Type errors explicitly

### Error Patterns
```tsx
try {
  // operation
} catch (error) {
  console.error("Context: Failed operation", error);
  // Handle user-facing response
}
```

---

## Testing Standards

### Test Files
- Location: `__tests__/` or `.test.ts` suffix
- Use Jest + React Testing Library
- Test user interactions, not implementation
- Aim for >80% coverage on critical paths

### Test Structure
```tsx
describe("Component", () => {
  it("renders correctly", () => {
    // Test
  });

  it("handles user interaction", () => {
    // Test
  });
});
```

---

## Performance Standards

### Bundle Optimization
- Dynamic imports for large components
- Image optimization with Next.js Image component
- Lazy loading for below-fold content
- Code splitting by route

### Runtime Performance
- Memoize expensive components with `React.memo`
- Use `useCallback` for event handlers passed to children
- Profile with React DevTools Profiler
- Target: LCP <2.5s, FID <100ms, CLS <0.1

### Monitoring
- Core Web Vitals tracking
- Error rate monitoring
- Performance budgets enforcement

---

## Accessibility Standards

### WCAG Compliance
- **Target**: WCAG 2.1 AA (minimum)
- **Color Contrast**: 4.5:1 for normal text
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy, landmarks

### Implementation
- Use semantic elements (nav, main, section, article)
- ARIA labels for icon-only buttons
- Alt text for images
- Keyboard navigation support
- Form labels associated with inputs

---

## Documentation Standards

### Code Comments
- Document "why", not "what" (code shows what)
- Use JSDoc for exported functions/components:
  ```tsx
  /**
   * Renders a styled button component
   * @param variant - Button style variant
   * @param disabled - Whether button is disabled
   * @returns JSX button element
   */
  ```
- Comment complex algorithms or non-obvious logic

### README Files
- Component README.md in each feature directory
- API documentation in `docs/api-docs.md`
- Setup instructions in root README.md

---

## Git & Commit Standards

### Commit Message Format
```
type(scope): short description (≤50 chars)

Detailed explanation (if needed, wrapped at 72 chars)
```

**Types**: feat, fix, refactor, style, test, docs, chore
**Scopes**: component-name, api, config, docs, etc.

### Branch Naming
- Feature: `feature/component-name`
- Fix: `fix/issue-description`
- Refactor: `refactor/component-name`
- Docs: `docs/section-name`

---

## Linting & Formatting

### ESLint Configuration
- Extends `eslint-config-next`
- Enforces consistent code style
- Runs automatically on save (with IDE setup)

### Prettier Configuration
- Line width: 80 characters (default)
- Single quotes: Disabled (use double quotes)
- Semicolons: Enabled
- Trailing commas: ES5
- Tab width: 2 spaces

### Pre-commit Checks (Recommended)
- ESLint validation
- Prettier formatting
- TypeScript type checking

---

## Development Workflow

### IDE Setup (Recommended)
- **Editor**: VS Code or equivalent
- **Extensions**:
  - ESLint
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin

### Local Development
```bash
npm run dev      # Start dev server
npm run lint     # Run ESLint
npm run build    # Test production build
npm test         # Run test suite (when available)
```

### Code Review Checklist
- [ ] TypeScript strict compliance
- [ ] No console.log/console.error in production
- [ ] Proper error handling
- [ ] Accessibility compliance
- [ ] Test coverage for critical paths
- [ ] Documentation updated
- [ ] No hardcoded secrets or API keys

---

## Security Standards

### Secrets Management
- Use environment variables (`.env.local`, `.env.local.example`)
- Never commit secrets to repository
- Use `.gitignore` for sensitive files

### Dependencies
- Regular security audits: `npm audit`
- Keep dependencies updated
- Review changelogs for breaking changes
- Pin versions in package.json

### Data Handling
- Sanitize user input
- Validate data on server and client
- Use HTTPS for all external requests
- Store sensitive data securely

---

## Performance Budgets

| Metric | Budget | Target |
|--------|--------|--------|
| Initial JS Bundle | <500KB | <300KB |
| LCP (Largest Contentful Paint) | <2.5s | <1.5s |
| FID (First Input Delay) | <100ms | <50ms |
| CLS (Cumulative Layout Shift) | <0.1 | <0.05 |
| Time to Interactive | <5s | <3s |

---

## Deprecation & Migration

### Marking Deprecated Code
```tsx
/**
 * @deprecated Use NewComponent instead
 * Migration: Replace OldComponent with NewComponent in imports
 */
export const OldComponent = () => { ... };
```

### Deprecation Notices
- Post in CHANGELOG.md
- Provide migration guide
- Maintain for 2-3 versions
- Remove in major version bump

---

## Additional Resources

- [Next.js Best Practices](https://nextjs.org/docs/basic-features/best-practices)
- [React Official Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/best-practices)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Exceptions & Waivers

- **Strict Type Checking**: Can be disabled with `// @ts-expect-error` (with justification)
- **ESLint Rules**: Can be disabled with `// eslint-disable-line` (with justification)
- **Performance Budgets**: Can be exceeded for critical features (requires approval)
