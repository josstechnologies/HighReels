import storage from 'expo-sqlite/kv-store';
import {observable} from '@legendapp/state';
import {configureSynced, syncObservable} from '@legendapp/state/sync';
import {observablePersistSqlite} from '@legendapp/state/persist-plugins/expo-sqlite';

export const MAX_ACCOUNTS = 5;

export type AuthTokens = {accessToken: string; refreshToken: string};

export type StoredAccount = {
  accountId: string;
  username: string;
  displayName: string | null;
  avatar: string | null;
  accessToken: string;
  refreshToken: string;
};

type AccountsState = {
  accounts: StoredAccount[];
  activeAccountId: string | null;
};

const persistOptions = configureSynced({persist: {plugin: observablePersistSqlite(storage)}});

/** Multi-account list (persisted). */
export const accountsState$ = observable<AccountsState>({
  accounts: [],
  activeAccountId: null,
});

export const accountsSyncState$ = syncObservable(accountsState$, persistOptions({persist: {name: 'AUTH_ACCOUNTS'}}));

/**
 * Mirror of the active account's tokens for interceptors / hasSession checks.
 * Not persisted — derived from accountsState$ (legacy AUTH migrated once on load).
 */
export const authState$ = observable<{accessToken: string | null; refreshToken: string | null}>({
  accessToken: null,
  refreshToken: null,
});

/** Legacy single-slot persist — read once for migration then ignored. */
const legacyAuthState$ = observable<{accessToken: string | null; refreshToken: string | null}>({
  accessToken: null,
  refreshToken: null,
});

export const authSyncState$ = syncObservable(legacyAuthState$, persistOptions({persist: {name: 'AUTH'}}));

/** In-memory: user started "Add Account" from the switcher (keeps other accounts). */
export const addAccountFlow$ = observable({active: false});

function syncAuthMirrorFromActive() {
  const activeId = accountsState$.activeAccountId.get();
  const accounts = accountsState$.accounts.get();
  const active = activeId ? accounts.find(a => a.accountId === activeId) : undefined;
  if (active) {
    authState$.assign({accessToken: active.accessToken, refreshToken: active.refreshToken});
  } else {
    authState$.assign({accessToken: null, refreshToken: null});
  }
}

export function getActiveAccount(): StoredAccount | undefined {
  const activeId = accountsState$.activeAccountId.get();
  if (!activeId) return undefined;
  return accountsState$.accounts.get().find(a => a.accountId === activeId);
}

export function getActiveTokens(): AuthTokens | null {
  const active = getActiveAccount();
  if (!active) return null;
  return {accessToken: active.accessToken, refreshToken: active.refreshToken};
}

export const addAccountFlowActions = {
  start: () => addAccountFlow$.active.set(true),
  clear: () => addAccountFlow$.active.set(false),
  isActive: () => addAccountFlow$.active.get(),
};

export const authActions = {
  /** Compatibility: activate tokens only (used briefly before profile upsert). Prefer completeSession. */
  setSession: ({accessToken, refreshToken}: AuthTokens) => {
    authState$.assign({accessToken, refreshToken});
  },
  setAccessToken: (accessToken: string) => {
    authState$.accessToken.set(accessToken);
    const activeId = accountsState$.activeAccountId.get();
    if (!activeId) return;
    const accounts = accountsState$.accounts.get();
    const idx = accounts.findIndex(a => a.accountId === activeId);
    if (idx < 0) return;
    const next = [...accounts];
    next[idx] = {...next[idx], accessToken};
    accountsState$.accounts.set(next);
  },
  updateActiveTokens: ({accessToken, refreshToken}: AuthTokens) => {
    const activeId = accountsState$.activeAccountId.get();
    authState$.assign({accessToken, refreshToken});
    if (!activeId) return;
    const accounts = accountsState$.accounts.get();
    const idx = accounts.findIndex(a => a.accountId === activeId);
    if (idx < 0) return;
    const next = [...accounts];
    next[idx] = {...next[idx], accessToken, refreshToken};
    accountsState$.accounts.set(next);
  },
  clearSession: () => {
    accountsState$.assign({accounts: [], activeAccountId: null});
    authState$.assign({accessToken: null, refreshToken: null});
    addAccountFlowActions.clear();
  },
  setActiveAccount: (accountId: string) => {
    const accounts = accountsState$.accounts.get();
    if (!accounts.some(a => a.accountId === accountId)) return false;
    accountsState$.activeAccountId.set(accountId);
    syncAuthMirrorFromActive();
    return true;
  },
  /** Insert or replace by accountId, set active. Enforces soft cap for new accountIds. */
  upsertAccount: (account: StoredAccount) => {
    const accounts = accountsState$.accounts.get();
    const existingIdx = accounts.findIndex(a => a.accountId === account.accountId);
    if (existingIdx < 0 && accounts.length >= MAX_ACCOUNTS) {
      throw new Error('ACCOUNT_CAP_REACHED');
    }
    const next =
      existingIdx >= 0
        ? accounts.map((a, i) => (i === existingIdx ? account : a))
        : [...accounts, account];
    accountsState$.accounts.set(next);
    accountsState$.activeAccountId.set(account.accountId);
    syncAuthMirrorFromActive();
  },
  /** Remove active account; activate another if any. Returns whether another account is now active. */
  removeActiveAccount: (): boolean => {
    const activeId = accountsState$.activeAccountId.get();
    const accounts = accountsState$.accounts.get();
    if (!activeId) {
      authState$.assign({accessToken: null, refreshToken: null});
      return false;
    }
    const remaining = accounts.filter(a => a.accountId !== activeId);
    accountsState$.accounts.set(remaining);
    if (remaining.length === 0) {
      accountsState$.activeAccountId.set(null);
      authState$.assign({accessToken: null, refreshToken: null});
      return false;
    }
    accountsState$.activeAccountId.set(remaining[0].accountId);
    syncAuthMirrorFromActive();
    return true;
  },
  /** After persist load: mirror active tokens; migrate legacy AUTH if needed. */
  hydrateFromPersist: () => {
    const accounts = accountsState$.accounts.get();
    if (accounts.length > 0) {
      const activeId = accountsState$.activeAccountId.get();
      if (!activeId || !accounts.some(a => a.accountId === activeId)) {
        accountsState$.activeAccountId.set(accounts[0].accountId);
      }
      syncAuthMirrorFromActive();
      return {needsLegacyMigration: false as const};
    }

    const legacyAccess = legacyAuthState$.accessToken.get();
    const legacyRefresh = legacyAuthState$.refreshToken.get();
    if (legacyAccess && legacyRefresh) {
      authState$.assign({accessToken: legacyAccess, refreshToken: legacyRefresh});
      return {needsLegacyMigration: true as const, tokens: {accessToken: legacyAccess, refreshToken: legacyRefresh}};
    }

    authState$.assign({accessToken: null, refreshToken: null});
    return {needsLegacyMigration: false as const};
  },
  clearLegacyAuth: () => {
    legacyAuthState$.assign({accessToken: null, refreshToken: null});
  },
};

export type SignupDraft = {
  sessionId: string | null;
  password: string | null;
  pin: string | null;
  dob: string | null;
};

const emptySignupDraft = (): SignupDraft => ({
  sessionId: null,
  password: null,
  pin: null,
  dob: null,
});

/** In-memory only — not a Session; cleared after Complete signup or abandon. */
export const signupDraft$ = observable<SignupDraft>(emptySignupDraft());

export const signupDraftActions = {
  start: (sessionId: string) => {
    signupDraft$.set({...emptySignupDraft(), sessionId});
  },
  setPassword: (password: string) => {
    signupDraft$.password.set(password);
  },
  setPin: (pin: string) => {
    signupDraft$.pin.set(pin);
  },
  setDob: (dob: string) => {
    signupDraft$.dob.set(dob);
  },
  clear: () => {
    signupDraft$.set(emptySignupDraft());
  },
};
