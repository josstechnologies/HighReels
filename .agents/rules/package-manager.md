---
description: Package manager — bun only, no npm/yarn/pnpm
globs: ["**/*"]
alwaysApply: true
---

# Package Manager — Bun Only

Use `bun` exclusively for all package and script operations in this repo.

## Allowed

- `bun install` (and `bun install --frozen-lockfile` in CI)
- `bun add <pkg>` / `bun remove <pkg>` / `bun update`
- `bun run <script>` (e.g., `bun run android`, `bun run lint`)
- `bunx <bin>` (e.g., `bunx expo prebuild`, `bunx expo-doctor`) — never `npx`

## Forbidden

- `npm install` / `npm ci` / `npm run` / `npx`
- `yarn` / `pnpm`
- Committing `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`

## Lockfile

- Single source of truth is `bun.lock`. `package-lock.json` must not exist and is ignored.
- EAS Build infers `bun` from `bun.lock` presence; dual locks cause `expo-doctor` failure `Multiple lock files`.

## Enforcement

- `ls package-lock.json` → should fail (file must be absent)
- CI: verify `bun.lock` exists and `package-lock.json` absent
- Grep `npx ` in docs/scripts → replace with `bunx `
