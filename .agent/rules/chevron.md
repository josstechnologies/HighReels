---
description: Right chevron / ArrowRight icon color consistency (#666)
globs: ["src/**/*.{ts,tsx}"]
alwaysApply: true
---

# Right Chevron Icon — Color & Weight Rule

Whenever the right chevron / `ArrowRight` icon is used, always apply the default chevron color `#666666` unless an explicit color is intentionally required.

## Tokens

* Tailwind: `text-chevron` / `bg-chevron` / `border-chevron` → `#666666` (`tailwind.config.js: chevron`)
* Alias: `text-grey-400` → `#666666` (same value, use `text-chevron` for semantic intent)
* Theme constant: `CHEVRON_COLOR` / `COLORS.chevron` from `@/theme/colors` (`src/theme/colors.ts`)
* SVG: `SVGS.ArrowRight` (`src/assets/SVGS/ArrowRight.tsx`) defaults to `strokeWidth={1.5}`; chevron usage MUST use `strokeWidth={2.2}` for increased weight

## Required Usage

```tsx
import { SVGS } from '@/assets';
import { CHEVRON_COLOR } from '@/theme/colors';

<SVGS.ArrowRight width={16} height={16} color={CHEVRON_COLOR} strokeWidth={2.2} />
// or Tailwind class where applicable: className="text-chevron" / className="text-grey-400"
```

Do NOT use:
* `color="#A7A7A7"` (old grey-200 chevron)
* `color="#111111"` / `color="black"` for default chevrons
* Omitting `strokeWidth` (defaults to 1.5, too light)

## Exceptions

Only override color/strokeWidth when design explicitly calls for it (e.g., `white` on dark background, `danger` state). Add inline comment `// chevron override: intentional` when deviating.

## Enforcement

* Grep `ArrowRight` in `src/` — every instance without `CHEVRON_COLOR` / `chevron` / `grey-400` and `strokeWidth={2.2}` is a violation unless commented as intentional override.
* Changing chevron color? Update `tailwind.config.js: chevron` + `src/theme/colors.ts: CHEVRON_COLOR` — never per-screen hard-code.
