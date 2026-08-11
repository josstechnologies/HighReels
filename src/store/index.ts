import storage from 'expo-sqlite/kv-store';
import {observable} from '@legendapp/state';
import {configureSynced, syncObservable} from '@legendapp/state/sync';
import {observablePersistSqlite} from '@legendapp/state/persist-plugins/expo-sqlite';

export type AuthTokens = {accessToken: string; refreshToken: string};

export const authState$ = observable<{accessToken: string | null; refreshToken: string | null}>({accessToken: null, refreshToken: null});

const persistOptions = configureSynced({persist: {plugin: observablePersistSqlite(storage)}});

export const authSyncState$ = syncObservable(authState$, persistOptions({persist: {name: 'AUTH'}}));

export const authActions = {
  setSession: ({accessToken, refreshToken}: AuthTokens) => {
    authState$.assign({accessToken, refreshToken});
  },
  setAccessToken: (accessToken: string) => {
    authState$.accessToken.set(accessToken);
  },
  clearSession: () => {
    authState$.assign({accessToken: null, refreshToken: null});
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
