import {useSyncExternalStore} from 'react';

export type BlockedAccount = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};

export const BLOCKED_ACCOUNTS: BlockedAccount[] = [
  {id: 'katty-1', name: 'Katty Abrahams', username: 'SootheEase', avatar: 'https://i.pravatar.cc/100?img=47'},
  {id: 'katty-2', name: 'Katty Abrahams', username: 'painFreenurse', avatar: 'https://i.pravatar.cc/100?img=44'},
  {id: 'katty-3', name: 'Katty Abrahams', username: 'painFreenutrition', avatar: 'https://i.pravatar.cc/100?img=49'},
  {id: 'john-smith', name: 'John Smith', username: 'FitLifeCoach', avatar: 'https://i.pravatar.cc/100?img=68'},
  {id: 'marie-curie', name: 'Marie Curie', username: 'ScienceChic', avatar: 'https://i.pravatar.cc/100?img=45'},
  {id: 'steve-jobs', name: 'Steve Jobs', username: 'TechInnovator', avatar: 'https://i.pravatar.cc/100?img=52'},
  {id: 'amelia-earhart', name: 'Amelia Earhart', username: 'AviatorAdventurer', avatar: 'https://i.pravatar.cc/100?img=32'},
  {id: 'nelson-mandela', name: 'Nelson Mandela', username: 'PeaceAdvocate', avatar: 'https://i.pravatar.cc/100?img=59'},
  {id: 'maya-angelou', name: 'Maya Angelou', username: 'WordsOfWisdom', avatar: 'https://i.pravatar.cc/100?img=26'},
];

let sessionBlocked: BlockedAccount[] = [];
let hidden = new Set<string>();
let visible: BlockedAccount[] = BLOCKED_ACCOUNTS;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

function rebuild() {
  visible = [...BLOCKED_ACCOUNTS.filter((account) => !hidden.has(account.id)), ...sessionBlocked.filter((account) => !hidden.has(account.id))];
}

export function useBlockedAccounts() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => visible
  );
}

export function blockAccount(account: BlockedAccount) {
  hidden.delete(account.id);
  if (!sessionBlocked.some((item) => item.id === account.id) && !BLOCKED_ACCOUNTS.some((item) => item.id === account.id)) {
    sessionBlocked = [...sessionBlocked, account];
  }
  rebuild();
  emit();
}

export function unblockAccount(id: string) {
  hidden.add(id);
  sessionBlocked = sessionBlocked.filter((account) => account.id !== id);
  rebuild();
  emit();
}
