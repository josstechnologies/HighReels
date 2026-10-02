---
description: Toggle consistency — 51x25 reusable component
globs: ["src/**/*.{ts,tsx}"]
alwaysApply: true
---

# Toggle — 51×25 Consistency Rule

All binary toggles/switches in the app MUST use the reusable `Toggle` component.

## Tokens (tailwind.config.js)

*   `w-toggle` / `h-toggle` → `51px` / `25px` (track)
*   `w-thumb` / `h-thumb` → `21px` / `21px` (thumb)
*   Padding `p-[2px]` on track, travel `TOGGLE_TRAVEL = 26` (`51 - 21 - 2*2`)

Do NOT hard-code dimensions via `style={{width,height}}`, `w-[52px]`, `h-8`, `h-6 w-6`, or inline `translateX: 20`.

## Required Usage

```tsx
import { Toggle } from '@/components/ui/Toggle';

<Toggle checked={value} onCheckedChange={setValue} accessibilityLabel="..." />
```

*   Component handles animation (`withTiming` 200ms `bezier(0.4,0,0.2,1)`, `interpolateColor #DFDFDF → #6F41EC`, `translateX: progress * TOGGLE_TRAVEL`).
*   Do not duplicate `useSharedValue`/`useAnimatedStyle`/`interpolateColor` per screen — reuse `Toggle`.

## Enforcement

*   New toggle PR must import `Toggle`; grep `h-8 w-\[52px\]` or `h-6 w-6` inside `src/screens/` is a violation.
*   Changing size? Update `tailwind.config.js` tokens + `TOGGLE_TRAVEL` in `src/components/ui/Toggle.tsx` — never per-screen.
