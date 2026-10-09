import {useSyncExternalStore} from 'react';

export type MyFolder = {
  id: string;
  nameKey?: 'travel' | 'fashion' | 'cooking';
  name?: string;
  privacy: 'private' | 'public';
  count: number;
  image: string;
};

const HILLS = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80';
const WOMAN = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80';
const MOUNTAINS = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80';
const COOKING = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80';

const SEED: MyFolder[] = [
  {id: 'travel', nameKey: 'travel', privacy: 'private', count: 5, image: HILLS},
  {id: 'fashion', nameKey: 'fashion', privacy: 'public', count: 4, image: WOMAN},
  {id: 'cooking', nameKey: 'cooking', privacy: 'private', count: 3, image: COOKING},
];

const REELS = [
  {id: 'r1', image: WOMAN, views: '319K'},
  {id: 'r2', image: WOMAN, views: '189K'},
  {id: 'r3', image: WOMAN, views: '798K'},
  {id: 'r4', image: HILLS, views: '806K'},
  {id: 'r5', image: MOUNTAINS, views: '990K'},
  {id: 'r6', image: COOKING, views: '276K'},
];

const REEL_COUNTS: Record<string, number> = {travel: 6, fashion: 4, cooking: 3};

let created: MyFolder[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export function useMyFolders() {
  const extra = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => created
  );
  return [...SEED, ...extra];
}

export function addMyFolder(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return;
  created = [...created, {id: `folder-${Date.now()}`, name: trimmed, privacy: 'private', count: 0, image: ''}];
  emit();
}

export function reelsFor(folderId: string) {
  return REELS.slice(0, REEL_COUNTS[folderId] ?? 0);
}
