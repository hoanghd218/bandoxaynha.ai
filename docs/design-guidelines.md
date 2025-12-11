# Design Guidelines - bandoxaynha.ai

**Version**: 1.0
**Last Updated**: 2025-12-11
**Scope**: Visual Design, Component Library, Design Tokens

---

## Design System Overview

Comprehensive design system for bandoxaynha.ai construction AI platform. Built on Tailwind CSS v4 with Radix UI component primitives.

---

## Color Palette

### Primary Colors

#### Brand Green
- **Usage**: Primary CTAs, success states, positive actions
- **Hex**: #2ECC71
- **RGB**: rgb(46, 204, 113)
- **Tailwind Class**: `bg-brand-green` / `text-brand-green`
- **Variants**:
  - Default: #2ECC71
  - Hover: #27AE60 (brand-darkGreen)
  - Active: #1E8449

```html
<button class="bg-brand-green hover:bg-brand-darkGreen">
  Action Button
</button>
```

#### Brand Blue
- **Usage**: Secondary actions, secondary CTAs, information
- **Hex**: #1C3E95
- **RGB**: rgb(28, 62, 149)
- **Tailwind Class**: `bg-brand-blue` / `text-brand-blue`
- **Variants**:
  - Default: #1C3E95
  - Hover: #152D6D (darker)
  - Active: #0F1F45 (darkest)

```html
<button class="bg-brand-blue text-white">
  Secondary Action
</button>
```

### Neutral Colors

#### Text Colors

**Neutral Gray** (#6B6B6B)
- **Usage**: Body text, labels, secondary copy
- **Tailwind Class**: `text-neutralGray`
- **Contrast**: WCAG AA compliant with white/light backgrounds

**Dark Text** (#222222)
- **Usage**: Headlines, primary copy
- **Tailwind Class**: Implicit (color-gray-900)
- **Note**: Default body text color

**Light Gray** (#F2F4F8)
- **Usage**: Card backgrounds, section backgrounds
- **Tailwind Class**: `bg-lightGray`
- **Contrast**: WCAG AA compliant

### Accent Colors

#### Neon Green (#6AFF65)
- **Usage**: Highlights, emphasis, attention-grabbing elements
- **Tailwind Class**: `bg-neonGreen` / `text-neonGreen`
- **Warning**: High contrast, use sparingly for emphasis

#### Silver Border (#DDE2E7)
- **Usage**: Dividers, borders, separation
- **Tailwind Class**: `border-silverBorder` (default border color)
- **Applied to**: Form inputs, cards, separators

### Gradient Colors

#### Primary Gradient
- **From**: #1FA54A (gradientFrom)
- **To**: #33D97A (gradientTo)
- **Usage**: Background gradients, premium features
- **Tailwind Class**: `from-gradientFrom to-gradientTo`

```html
<div class="bg-gradient-to-r from-gradientFrom to-gradientTo">
  Premium Feature
</div>
```

### Semantic Colors (Future)

**Success**
- **Primary**: brand-green (#2ECC71)
- **Light**: rgba(46, 204, 113, 0.1)

**Error**
- **Primary**: red-500 (Tailwind default)
- **Light**: red-50

**Warning** (To Be Defined)
- **Primary**: amber-500 (Tailwind default)
- **Light**: amber-50

**Info** (To Be Defined)
- **Primary**: blue-500 (Tailwind default)
- **Light**: blue-50

---

## Typography System

### Font Families

#### Inter (Primary / Body Font)
- **Usage**: Body text, UI elements, labels
- **Font Weights**: 400 (normal), 600 (semibold)
- **Subsets**: Latin, Vietnamese
- **Size Range**: 12px - 18px (for body)
- **Line Height**: 1.5 (default)
- **Tailwind Class**: `font-sans`

```html
<body class="font-sans">Body text in Inter</body>
<p class="font-sans text-sm">Small text</p>
```

#### Montserrat (Secondary / Display Font)
- **Usage**: Headlines, section titles, emphasis
- **Font Weights**: 600 (semibold), 700 (bold)
- **Subsets**: Latin, Vietnamese
- **Size Range**: 20px - 48px+ (for headings)
- **Line Height**: 1.2 (tighter)
- **Tailwind Class**: `font-montserrat`

```html
<h1 class="font-montserrat font-bold text-4xl">Heading</h1>
<h2 class="font-montserrat font-semibold text-2xl">Subheading</h2>
```

### Typography Scale

| Role | Font | Size | Weight | Line Height | Usage |
|------|------|------|--------|-------------|-------|
| Display Large | Montserrat | 48px | 700 | 1.2 | Main page titles |
| Display Medium | Montserrat | 36px | 700 | 1.2 | Section titles |
| Display Small | Montserrat | 28px | 700 | 1.2 | Subsection titles |
| Heading 1 | Montserrat | 24px | 600 | 1.3 | Major headings |
| Heading 2 | Montserrat | 20px | 600 | 1.3 | Minor headings |
| Heading 3 | Montserrat | 18px | 600 | 1.4 | Sub-headings |
| Body Large | Inter | 18px | 400 | 1.5 | Lead text, callouts |
| Body | Inter | 16px | 400 | 1.5 | Default body text |
| Body Small | Inter | 14px | 400 | 1.5 | Secondary text |
| Caption | Inter | 12px | 400 | 1.5 | Captions, hints |
| Code | Monospace | 12px | 400 | 1.4 | Code blocks |

### Font Loading Strategy

All fonts configured with `display: swap`:
- Fallback font displays immediately
- Custom font swaps in when loaded
- No layout shift (CLS protection)

```tsx
// app/layout.tsx
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});
```

---

## Component Library

### Button Component

#### Variants

**Default (Primary)**
- Background: brand-green (#2ECC71)
- Text: white
- Hover: brand-darkGreen (#27AE60)
- Usage: Primary CTAs

```html
<button class="bg-brand-green text-white hover:bg-brand-darkGreen">
  Primary Action
</button>
```

**Secondary**
- Background: brand-blue (#1C3E95)
- Text: white
- Hover: darker blue
- Usage: Secondary actions

```html
<button class="bg-brand-blue text-white">
  Secondary Action
</button>
```

**Outline**
- Border: brand-green
- Background: transparent
- Text: brand-green
- Hover: green background, white text
- Usage: Alternative actions

```html
<button class="border border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
  Outline Button
</button>
```

**Destructive**
- Background: red-500
- Text: white
- Hover: red-600
- Usage: Delete, danger actions

```html
<button class="bg-red-500 text-white hover:bg-red-600">
  Delete
</button>
```

**Ghost**
- Background: transparent (hover: light-gray)
- Text: brand-blue
- Usage: Tertiary actions

```html
<button class="hover:bg-lightGray text-brand-blue">
  Ghost Button
</button>
```

**Link**
- Background: transparent
- Text: brand-green (underlined)
- Hover: underlined
- Usage: Navigation links, secondary CTAs

```html
<button class="text-brand-green underline-offset-4 hover:underline">
  Link Button
</button>
```

#### Sizes

| Size | Padding | Font Size | Height | Usage |
|------|---------|-----------|--------|-------|
| Small | px-3 py-2 | 12px | 32px | Compact actions |
| Default | px-4 py-2 | 14px | 36px | Standard buttons |
| Large | px-8 py-2 | 14px | 40px | Primary CTAs |
| Icon | - | - | 36px | Icon-only buttons |

### Component States

#### Disabled State
- Opacity: 50%
- Pointer: not-allowed
- Cursor: disabled
- No hover effects

```html
<button disabled class="disabled:pointer-events-none disabled:opacity-50">
  Disabled
</button>
```

#### Loading State (Future)
- Icon: spinner/skeleton
- Disabled: true
- Cursor: waiting
- Text: optional "Loading..."

#### Focus State
- Ring: 1px ring
- Ring Color: default (brand-green or blue)
- Offset: 2px

```html
<button class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
  Focusable
</button>
```

---

## Spacing & Layout

### Spacing Scale

Uses Tailwind default 4px base unit:

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| 1x | 4px | `p-1`, `m-1`, `gap-1` |
| 2x | 8px | `p-2`, `m-2`, `gap-2` |
| 3x | 12px | `p-3`, `m-3`, `gap-3` |
| 4x | 16px | `p-4`, `m-4`, `gap-4` |
| 6x | 24px | `p-6`, `m-6`, `gap-6` |
| 8x | 32px | `p-8`, `m-8`, `gap-8` |
| 12x | 48px | `p-12`, `m-12`, `gap-12` |
| 16x | 64px | `p-16`, `m-16`, `gap-16` |

### Common Layouts

**Horizontal Stack**
```html
<div class="flex gap-4 items-center">
  <!-- items -->
</div>
```

**Vertical Stack**
```html
<div class="flex flex-col gap-6">
  <!-- items -->
</div>
```

**Grid (Auto)**
```html
<div class="grid grid-cols-auto gap-4">
  <!-- items -->
</div>
```

**Container Padding**
- Horizontal: `px-4` (mobile) → `px-8` (tablet) → `px-24` (desktop)
- Vertical: `py-6` (mobile) → `py-12` (desktop)

---

## Borders & Shadows

### Border Radius

| Type | Value | Tailwind Class | Usage |
|------|-------|----------------|-------|
| Small | 4px | `rounded-sm` | Inputs, small elements |
| Medium | 6px | `rounded-md` | Cards, buttons (default) |
| Large | 8px | `rounded-lg` | Large cards, containers |
| Full | 9999px | `rounded-full` | Avatars, pills |

### Border Colors
- **Default**: silver-border (#DDE2E7)
- **Hover**: neutral-gray (#6B6B6B) - optional
- **Active**: brand-green (#2ECC71)
- **Error**: red-500

```html
<input class="border border-silverBorder focus:border-brand-green" />
```

### Shadows

**Elevation System** (Future)

| Level | Shadow | Usage |
|-------|--------|-------|
| None | - | Flat design, no elevation |
| Low | 0 1px 3px rgba(0,0,0,0.1) | Subtle depth |
| Medium | 0 4px 6px rgba(0,0,0,0.1) | Cards, modals |
| High | 0 10px 15px rgba(0,0,0,0.1) | Floating elements, dropdowns |

---

## Icons

### Lucide React Icons
- **Library**: lucide-react@0.560.0
- **Size**: 24px (default)
- **Stroke Width**: 2px (default)
- **Color**: Inherit from parent or specify

```tsx
import { CheckCircle, AlertTriangle } from "lucide-react";

<CheckCircle className="w-6 h-6 text-brand-green" />
<AlertTriangle className="w-6 h-6 text-red-500" />
```

### Icon Guidelines
- Use for visual enhancement, not exclusively
- Pair with text labels for clarity
- Maintain consistent sizing
- Use brand colors for semantic meaning

---

## Accessibility

### Color Contrast
- **WCAG AA**: 4.5:1 for normal text
- **WCAG AAA**: 7:1 for enhanced contrast
- **Verified Pairs**:
  - Green (#2ECC71) on white: ✅ WCAG AA
  - Blue (#1C3E95) on white: ✅ WCAG AA
  - Gray text (#6B6B6B) on white: ✅ WCAG AA

### Focus Management
- Visible focus indicators (ring)
- Keyboard navigation support
- Focus visible for mouse and keyboard
- Tab order logical

### Semantic HTML
- Use proper heading hierarchy (h1 → h6)
- Semantic elements (nav, main, section, article)
- Form labels associated with inputs
- ARIA labels where needed

---

## Dark Mode (Future)

### Planned Implementation
- CSS custom properties for color schemes
- Tailwind dark: prefix support
- User preference detection
- Toggle in UI

### Color Mapping (Planned)
```css
:root {
  --color-bg-primary: white;
  --color-text-primary: #222;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #1a1a1a;
    --color-text-primary: #f0f0f0;
  }
}
```

---

## Responsive Design

### Breakpoints (Tailwind Default)

| Device | Breakpoint | Tailwind Prefix | Usage |
|--------|-----------|------------------|-------|
| Mobile | < 640px | - | No prefix |
| Small | 640px+ | `sm:` | Tablets |
| Medium | 768px+ | `md:` | Small desktops |
| Large | 1024px+ | `lg:` | Desktops |
| XL | 1280px+ | `xl:` | Large desktops |

### Mobile-First Approach
- Start with mobile styles
- Use breakpoint prefixes for larger screens

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 column mobile, 2 columns tablets, 3 columns desktops -->
</div>
```

### Touch-Friendly Sizing
- Minimum tap target: 44px × 44px
- Button padding ensures this minimum
- Adequate spacing between interactive elements

---

## Animations & Transitions

### Tailwind Animate Plugin
- Library: tailwindcss-animate@1.0.7
- Preset animations available

### Animation Classes

| Class | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `animate-spin` | 1s | linear | Loading spinners |
| `animate-ping` | 1s | cubic | Notification pulses |
| `animate-pulse` | 2s | cubic | Skeleton states |
| `animate-bounce` | 1s | cubic | Call to action |

### Transition Best Practices
- Duration: 150ms-300ms (standard)
- Easing: ease-in-out (natural)
- Hardware acceleration: use `transform`
- Avoid animating `width`/`height` (use `max-height`)

```html
<button class="transition-colors duration-200 hover:bg-brand-darkGreen">
  Hover me
</button>
```

---

## Design Tokens (Tailwind Config)

All design tokens are defined in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        green: "#2ECC71",
        darkGreen: "#27AE60",
        blue: "#1C3E95",
      },
      neutralGray: "#6B6B6B",
      lightGray: "#F2F4F8",
      neonGreen: "#6AFF65",
      silverBorder: "#DDE2E7",
      gradientFrom: "#1FA54A",
      gradientTo: "#33D97A",
    },
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      montserrat: ["var(--font-montserrat)", "sans-serif"],
    },
  },
}
```

---

## Design Pattern Examples

### Card Pattern
```html
<div class="bg-white border border-silverBorder rounded-md p-6 shadow-sm">
  <h3 class="font-montserrat font-semibold text-xl mb-2">Title</h3>
  <p class="text-neutralGray text-sm">Content</p>
</div>
```

### Form Field Pattern
```html
<div class="flex flex-col gap-2">
  <label class="font-medium text-sm">Label</label>
  <input class="border border-silverBorder rounded-md px-3 py-2" />
  <p class="text-xs text-neutralGray">Helper text</p>
</div>
```

### Alert Pattern
```html
<div class="bg-lightGray border-l-4 border-brand-green p-4 rounded">
  <p class="text-brand-blue font-medium">Success</p>
  <p class="text-neutralGray text-sm">Message here</p>
</div>
```

---

## Future Design Considerations

- [ ] Dark mode support
- [ ] Additional semantic colors
- [ ] Shadow system definition
- [ ] Animation library expansion
- [ ] Component documentation (Storybook)
- [ ] Design token versioning
- [ ] Localization support (RTL languages)
- [ ] Advanced form component library

---

## References & Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/v4)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [WCAG 2.1 Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- [Lucide React Icons](https://lucide.dev/)
