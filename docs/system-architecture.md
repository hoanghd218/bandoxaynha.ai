# System Architecture - bandoxaynha.ai

**Version**: 1.0
**Last Updated**: 2025-12-11
**Phase**: Foundation Setup

---

## Architecture Overview

Modular, scalable Next.js 15+ application with modern React 19 features, TypeScript strict mode, and integrated design system.

```
┌─────────────────────────────────────────────────────────────────┐
│                       Browser / Client Layer                     │
├─────────────────────────────────────────────────────────────────┤
│                     Next.js App Router (React 19)                │
│  ┌────────────────┬────────────────┬──────────────┬────────────┐ │
│  │  Pages (app/)  │ Components/UI  │ Client State │  Utilities │ │
│  └────────────────┴────────────────┴──────────────┴────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 Server-Side Rendering Layer                      │
│  ┌────────────┬──────────────┬────────────────────────────────┐ │
│  │ API Routes │ Server Comp. │ Next.js Built-in Features     │ │
│  └────────────┴──────────────┴────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    External APIs & Services                      │
│       (Database, Auth, ML Services, Third-party APIs)           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Details

### Frontend Layer
- **Framework**: Next.js 16.0.8 (App Router)
- **UI Library**: React 19.2.1 (React Server Components ready)
- **Styling**: Tailwind CSS 4.1.17 (utility-first)
- **Component Library**: shadcn/ui (built on Radix UI primitives)
- **Icons**: Lucide React 0.560.0
- **Utilities**: clsx 2.1.1, tailwind-merge 3.4.0
- **Type Safety**: TypeScript 5.9.3 (strict mode)

### Component Foundation
- **Base Components**: shadcn/ui (Radix UI)
- **Variant System**: Class Variance Authority (CVA)
- **Style Composition**: cn() utility for class merging
- **Color Tokens**: Tailwind config (brand colors)
- **Font System**: Google Fonts (Inter, Montserrat)

### Development Tools
- **Linting**: ESLint 9.39.1 (Next.js config + Prettier)
- **Formatting**: Prettier 3.7.4
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js built-in (Webpack)

### Future Integrations
- API routes (`app/api/`)
- Database layer (to be determined)
- Authentication system
- State management (Redux/Zustand/Jotai - TBD)
- Image optimization
- Caching strategies

---

## Directory Structure & Modules

### `/app` - Application Routes & Pages
```
app/
├── layout.tsx          # Root layout (fonts, metadata, wrapper)
├── page.tsx            # Homepage route (/)
├── globals.css         # Global styles (Tailwind import)
└── api/                # API routes (future)
    └── [...routes]/
```

**Responsibility**: Page routing, metadata, global wrapper, server-side rendering

### `/components` - Reusable UI Components
```
components/
├── ui/                 # Base UI components (shadcn/ui)
│   ├── button.tsx      # Button component with variants
│   ├── card.tsx        # (future)
│   └── input.tsx       # (future)
└── features/           # Feature-specific components (future)
    └── [...components]/
```

**Responsibility**: Shared, reusable components following shadcn/ui patterns

### `/lib` - Utilities & Helpers
```
lib/
├── utils.ts            # cn() utility for class merging
├── api/                # API client setup (future)
│   └── client.ts
├── hooks/              # Custom React hooks (future)
│   └── useAsync.ts
└── constants/          # App constants (future)
    └── api.ts
```

**Responsibility**: Utility functions, helpers, constants

### `/docs` - Documentation
```
docs/
├── codebase-summary.md     # Codebase overview (this phase)
├── code-standards.md       # Coding standards & patterns
├── system-architecture.md  # This file
├── design-guidelines.md    # Design system & colors
├── project-overview-pdr.md # Project overview & PDR
└── [...phase-docs]/        # Phase-specific documentation
```

**Responsibility**: Developer documentation, guides, standards

---

## Core Components

### Button Component Architecture
```tsx
// components/ui/button.tsx
├── buttonVariants (CVA)
│   ├── Base classes (sizing, transitions, focus)
│   ├── Variants (default, destructive, outline, secondary, ghost, link)
│   └── Sizes (default, sm, lg, icon)
├── ButtonProps interface
│   ├── Extends HTMLButtonElement attributes
│   ├── Variant prop type
│   └── Size prop type
└── Button component (React.forwardRef)
    ├── Props forwarding
    ├── Slot composition support
    └── displayName for debugging
```

**Features**:
- Full variant support (6 types × 4 sizes)
- Icon sizing (SVG)
- Keyboard accessibility (focus ring)
- Disabled states
- TypeScript support
- Radix UI Slot composition

---

## Data Flow Architecture

### Client-Side (Current)
```
User Input → React Component → State Update → Render → DOM
```

### Server-Side (Future)
```
Request → API Route → Service Layer → Database → Response
```

### Complete Flow (Phase 2+)
```
Client Component
    ↓
[Fetch/Server Action]
    ↓
API Route / Server Component
    ↓
Service Layer (validation, business logic)
    ↓
Database / External Services
    ↓
Response → UI Update
```

---

## Design System Architecture

### Color Hierarchy
```
Brand Colors
├── Primary: #2ECC71 (green) → hover: #27AE60 (dark green)
├── Secondary: #1C3E95 (blue)
└── Accent: #6AFF65 (neon green)

Neutral Colors
├── Text: #6B6B6B (gray)
├── Background: #F2F4F8 (light gray)
└── Border: #DDE2E7 (silver)

Semantic Colors (future)
├── Success: (derived from green)
├── Error: red (built-in)
├── Warning: (to be defined)
└── Info: (to be defined)
```

### Typography System
```
Font Stack
├── Primary (body): Inter
│   ├── weights: 400 (normal), 600 (semibold)
│   └── subsets: latin, vietnamese
└── Secondary (headings): Montserrat
    ├── weights: 600 (semibold), 700 (bold)
    └── subsets: latin, vietnamese

Tailwind Classes
├── font-sans → Inter
└── font-montserrat → Montserrat
```

### Spacing & Sizing
Uses Tailwind default scale:
- Padding/Margin: 4px units (p-1=4px, p-4=16px)
- Gap: Same scale (gap-2=8px, gap-4=16px)
- Border radius: md=6px (default), lg=8px

---

## Scalability Architecture

### Horizontal Scaling (Future)
- Stateless design enables multi-instance deployment
- Environment variables for configuration
- API routes ready for load balancing

### Vertical Scaling
- Code splitting by route (Next.js automatic)
- Dynamic imports for heavy components
- Optimized bundle strategy

### Performance Optimization
- Image optimization (Next.js Image)
- Font optimization (next/font)
- CSS purging (Tailwind)
- Tree-shaking (TypeScript, webpack)

---

## Security Architecture

### Current Measures
- TypeScript strict mode (type safety)
- Input validation ready (future API routes)
- Environment variables for secrets

### Planned Security Layers
- CSRF protection (Next.js built-in)
- XSS prevention (React escaping, CSP headers)
- SQL injection prevention (ORM layer, parameterized queries)
- Authentication & authorization
- Rate limiting for APIs
- CORS configuration

---

## State Management Strategy

### Current (Phase 1)
- React local state (useState)
- Props drilling for component hierarchies
- Context API ready for implementation

### Planned (Phase 2+)
**Decision Point**: Choose one
- **Redux**: Large app, time-travel debugging, middleware
- **Zustand**: Lightweight, simple API, small bundles
- **Jotai**: Atomic state, minimal overhead
- **Recoil**: Facebook-backed, async-first

**Recommendation**: Zustand (simplicity + performance)

---

## Testing Architecture

### Unit Testing
- **Framework**: Jest (built-in with Next.js)
- **Location**: `__tests__/` or `.test.ts`
- **Target Coverage**: >80% critical paths

### Integration Testing
- **Framework**: React Testing Library
- **Scope**: Component interactions, API mocking

### E2E Testing
- **Framework**: Playwright (recommended)
- **Scope**: User workflows, critical paths

### Current Status
- 9/9 tests passing (basic setup)
- Zero critical issues

---

## Deployment Architecture

### Build Process
```
Next.js build → Webpack bundle → Static optimizations → Output
```

### Deployment Targets (Planned)
- **Primary**: Vercel (Next.js optimized)
- **Alternative**: Self-hosted (Docker, PM2, Nginx)
- **Database**: PostgreSQL (recommended)
- **CDN**: Cloudflare (performance)

### Environment Strategy
```
Development (npm run dev)
  ↓
Staging (.env.staging)
  ↓
Production (.env.production)
```

---

## Error Handling & Monitoring

### Client-Side Errors
- React Error Boundaries (future)
- Console logging for debugging
- User-friendly error messages

### Server-Side Errors
- API route error handling (future)
- Server log aggregation
- Error tracking (Sentry recommended)

### Monitoring Stack (Planned)
- Performance metrics (Core Web Vitals)
- Error tracking (Sentry or similar)
- Analytics (Vercel Analytics or GA4)

---

## API Architecture (Future)

### API Route Structure
```
app/api/
├── v1/
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   ├── users/
│   │   ├── route.ts (GET, POST)
│   │   └── [id]/route.ts (GET, PUT, DELETE)
│   └── [feature]/
│       └── route.ts
└── health/route.ts
```

### API Request/Response Pattern
```tsx
// Request
POST /api/v1/users
Content-Type: application/json
Authorization: Bearer token

{
  "name": "John Doe",
  "email": "john@example.com"
}

// Response
{
  "success": true,
  "data": { /* data */ },
  "error": null
}
```

### Error Response Format
```tsx
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": { /* detailed errors */ }
  }
}
```

---

## Database Architecture (Future)

### Recommended Stack
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Migrations**: Prisma migrations
- **Connection Pooling**: PgBouncer or Prisma middleware

### Schema Organization
```
schema.prisma
├── datasource (database connection)
├── generator (client generation)
├── models
│   ├── User
│   ├── Project
│   └── [...models]
└── enums (shared types)
```

---

## Performance Metrics & Targets

### Core Web Vitals (CWV)
| Metric | Target | Acceptable |
|--------|--------|------------|
| LCP (Largest Contentful Paint) | <1.5s | <2.5s |
| FID (First Input Delay) | <50ms | <100ms |
| CLS (Cumulative Layout Shift) | <0.05 | <0.1 |

### Bundle Size Targets
| Category | Budget | Current |
|----------|--------|---------|
| Initial JS | <300KB | <500KB |
| CSS | <50KB | <20KB |
| Fonts | <100KB | <50KB |
| Total | <500KB | ~500KB |

### Performance Optimizations
- Image optimization (next/image)
- Font subsetting (Vietnamese support)
- CSS purging (Tailwind)
- Code splitting (route-based)
- Caching strategies (HTTP headers)

---

## Dependency Management

### Core Dependencies
- next@16.0.8
- react@19.2.1
- typescript@5.9.3
- tailwindcss@4.1.17

### UI & Styling
- @radix-ui/react-slot@1.2.4
- class-variance-authority@0.7.1
- tailwindcss-animate@1.0.7
- lucide-react@0.560.0

### Utilities
- clsx@2.1.1 (class name utility)
- tailwind-merge@3.4.0 (merge Tailwind classes)

### Dev Dependencies
- @types/* (type definitions)
- eslint@9.39.1
- prettier@3.7.4

---

## Future Architecture Considerations

### Phase 2+
- [ ] API routes implementation
- [ ] Database integration
- [ ] Authentication system
- [ ] State management
- [ ] Error tracking
- [ ] Analytics
- [ ] Search functionality
- [ ] File uploads
- [ ] Real-time features
- [ ] Caching strategies

### Technical Debt Monitoring
- Track deprecated patterns
- Monitor bundle size growth
- Review performance metrics
- Update dependencies regularly
- Refactor as needed

---

## References

- [Next.js 16 Architecture](https://nextjs.org/docs/getting-started/project-structure)
- [React 19 Architecture](https://react.dev/blog/2024/12/19/react-19)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [shadcn/ui Components](https://ui.shadcn.com/)
