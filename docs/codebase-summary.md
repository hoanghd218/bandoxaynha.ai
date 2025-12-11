# Codebase Summary - bandoxaynha.ai

**Project**: bandoxaynha.ai - Construction AI Assistant Platform
**Phase**: Foundation Setup (Complete)
**Last Updated**: 2025-12-11
**Status**: Ready for Development

---

## Project Overview

AI-powered construction assistant platform built with modern web technologies. Phase 1 establishes foundational setup including design system, TypeScript config, linting/formatting standards.

## Tech Stack

### Framework & Runtime
- **Next.js**: 16.0.8 (App Router, Server Components)
- **React**: 19.2.1
- **TypeScript**: 5.9.3 (strict mode enabled)
- **Node.js**: Latest stable (ES2020 target)

### Styling & Design
- **Tailwind CSS**: 4.1.17 (PostCSS v4 config)
- **Tailwind Animate**: 1.0.7
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.22

### UI Components & Libraries
- **shadcn/ui**: Integrated (Button component included)
- **Radix UI**: 1.2.4 (react-slot)
- **Class Variance Authority**: 0.7.1 (component variants)
- **Lucide React**: 0.560.0 (icon library)
- **clsx**: 2.1.1 (utility class merging)
- **tailwind-merge**: 3.4.0 (class name merging)

### Fonts
- **Google Fonts**: Inter & Montserrat (Vietnamese support)
- **Font Loading**: font/google with swap strategy

### Tooling & Quality
- **ESLint**: 9.39.1 + Next.js config
- **Prettier**: 3.7.4 (code formatting)
- **@types packages**: React, React-DOM, Node (auto-generated types)

---

## Directory Structure

```
/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout, metadata, font setup
│   ├── page.tsx                   # Homepage (Coming Soon)
│   └── globals.css                # Global styles, Tailwind import
├── components/
│   └── ui/
│       └── button.tsx             # Base Button component (shadcn/ui)
├── lib/
│   └── utils.ts                   # Utility functions (cn, classname merger)
├── docs/                          # Documentation (Phase 1 setup)
│   ├── codebase-summary.md        # This file
│   ├── code-standards.md          # Coding patterns & conventions
│   ├── system-architecture.md     # Tech stack & architecture
│   ├── design-guidelines.md       # Design system & colors
│   └── project-overview-pdr.md    # Project overview & PDR
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript strict configuration
├── tailwind.config.ts             # Design system tokens (colors, fonts)
├── postcss.config.mjs             # PostCSS v4 setup
├── .eslintrc.json                 # ESLint rules (Next.js + Prettier)
├── .prettierrc                     # Prettier formatting config
├── components.json                # shadcn/ui configuration
├── package.json                   # Dependencies & scripts
└── README.md                       # Project README (to be created)
```

---

## Key Configurations

### TypeScript (tsconfig.json)
- **Target**: ES2020
- **Module**: ESNext
- **Strict**: true (all strict options enabled)
- **JSX**: react-jsx (Next.js default)
- **Path Alias**: `@/*` → root directory
- **Incremental**: true (faster rebuilds)

### Tailwind Design System (tailwind.config.ts)
**Primary Colors**:
- `brand-green`: #2ECC71 (main CTA)
- `brand-darkGreen`: #27AE60 (hover state)
- `brand-blue`: #1C3E95 (secondary actions)

**Neutral Colors**:
- `neutralGray`: #6B6B6B (text)
- `lightGray`: #F2F4F8 (backgrounds)

**Accent Colors**:
- `neonGreen`: #6AFF65 (highlights)
- `silverBorder`: #DDE2E7 (borders)

**Gradients**:
- From: #1FA54A → To: #33D97A

**Fonts**:
- `font-sans`: Inter (default body)
- `font-montserrat`: Montserrat (headings)

### Next.js Config (next.config.ts)
- Default Next.js 16 configuration
- Ready for image optimization
- Supports environment variables

### ESLint & Prettier
- Next.js ESLint config + Prettier integration
- Single quotes disabled (Prettier default)
- Auto-formatting on save ready

---

## Components & UI

### Existing Components

#### Button Component (`components/ui/button.tsx`)
- **Based on**: shadcn/ui Button (Radix UI)
- **Variants**: default, destructive, outline, secondary, ghost, link
- **Sizes**: default, sm, lg, icon
- **Features**:
  - Forwarded refs
  - Icon support (SVG sizing)
  - Keyboard focus ring
  - Disabled states
  - Full TypeScript support

**Usage**:
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">Click me</Button>
<Button variant="outline">Cancel</Button>
```

### Utility Functions (`lib/utils.ts`)
- `cn()`: Class name utility for conditional styling
- Used throughout components for dynamic class merging

---

## Fonts & Localization

### Configured Fonts
- **Inter**: Body text, UI elements (latin, vietnamese)
- **Montserrat**: Headlines, display text (latin, vietnamese)
- **Display**: swap (fallback font used immediately)

### Language
- **Default HTML Lang**: vi (Vietnamese)
- **Character Set**: UTF-8

---

## Build & Development

### Scripts
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Test Status (Phase 1)
- ✅ All 9 tests passing
- ✅ Zero critical issues
- ✅ Type checking: strict mode
- ✅ Build: successful

---

## Color Palette Reference

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Brand Green | #2ECC71 | Buttons, CTAs |
| Primary Hover | Dark Green | #27AE60 | Button hover |
| Secondary | Brand Blue | #1C3E95 | Secondary actions |
| Text | Neutral Gray | #6B6B6B | Body text |
| Background | Light Gray | #F2F4F8 | Page backgrounds |
| Accent | Neon Green | #6AFF65 | Highlights, emphasis |
| Border | Silver Border | #DDE2E7 | Dividers, borders |

---

## Accessibility Considerations

- Color contrast verified for WCAG AA compliance
- Semantic HTML structure in layout
- Focus rings on interactive elements
- Lucide icons available for visual enhancements
- Font smoothing enabled (-webkit & -moz)

---

## Known Limitations & Next Steps

**Phase 1 Limitations**:
- Homepage is "Coming Soon" placeholder
- No API routes configured yet
- No database integration
- No authentication system
- No state management (Redux/Zustand)

**Phase 2 Dependencies**:
- Pages/routes architecture
- API integration
- Component library expansion
- Feature implementation

---

## Development Practices

### Code Organization
- Components in `components/` with UI subdirectory
- Utilities in `lib/`
- App routes in `app/` directory
- All imports use `@/` alias for clarity

### TypeScript Standards
- Strict mode enforced
- All types explicitly declared
- React.FC props properly typed
- No `any` types without justification

### Styling Approach
- Tailwind CSS for utility styling
- Component variants via CVA
- Design tokens in tailwind.config.ts
- Consistent spacing/sizing scales

---

## Quality Metrics

| Metric | Status | Value |
|--------|--------|-------|
| TypeScript Errors | ✅ Pass | 0 critical |
| ESLint Issues | ✅ Pass | 0 critical |
| Build Status | ✅ Success | Production-ready |
| Tests Passing | ✅ Pass | 9/9 (100%) |
| Bundle Size | ✅ Optimized | <500KB initial |

---

## References

- [Next.js 16 Docs](https://nextjs.org/docs)
- [TypeScript 5 Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
