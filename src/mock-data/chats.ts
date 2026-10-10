import {useSyncExternalStore} from 'react';

export type ChatMessage = {
  id: string;
  text: string;
  isSender: boolean;
  timestamp: string;
  createdAt: string;
  pinned?: boolean;
};

/** Tick state for a thread whose last message is ours. */
export type OutgoingStatus = 'sent' | 'received' | 'read';

export type ChatThread = {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  outgoingStatus: OutgoingStatus | null;
  unreadCount: number;
  /** Unknown sender. Stays on Requests until accepted. */
  request?: boolean;
  messages: ChatMessage[];
};

export type InboxStory = {
  id: string;
  name: string;
  cover: string;
  avatar: string | null;
};

const portrait = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&h=200&q=80`;
const cover = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=560&q=80`;

export const INBOX_STORIES: InboxStory[] = [
  {id: 'add', name: '', cover: cover('photo-1531123897727-8f129e1688ce'), avatar: null},
  {
    id: 'talan',
    name: 'Talan Culhane',
    cover: cover('photo-1514525253161-7a46d19cd819'),
    avatar: portrait('photo-1500648767791-00dcc994a43e'),
  },
  {
    id: 'madevan',
    name: 'Madevan',
    cover: cover('photo-1519741497674-611481863552'),
    avatar: portrait('photo-1524504388940-b1c1722653e1'),
  },
  {
    id: 'gretchen-story',
    name: 'Gretchen Press',
    cover: cover('photo-1500530855697-b586d89ba3ee'),
    avatar: portrait('photo-1529626455594-4ff0802cfb7e'),
  },
];

export const CHATS: ChatThread[] = [
  {
    id: 'zaire',
    name: 'Zaire Schleifer',
    image: portrait('photo-1500648767791-00dcc994a43e'),
    lastMessage: 'Okay, sounds good',
    time: '9/30/26',
    outgoingStatus: 'received',
    unreadCount: 0,
    messages: [
      {id: 'z1', text: 'Are we still on for later?', isSender: true, timestamp: '9:12 AM', createdAt: '2026-09-30T09:12:00.000Z'},
      {id: 'z2', text: 'Okay, sounds good', isSender: true, timestamp: '9:18 AM', createdAt: '2026-09-30T09:18:00.000Z'},
    ],
  },
  {
    id: 'zola',
    name: 'Zola Kim',
    image: portrait('photo-1494790108377-be9c29b29330'),
    lastMessage: 'Hello please accept my request…',
    time: '8:20 AM',
    outgoingStatus: null,
    unreadCount: 0,
    request: true,
    messages: [{id: 'k1', text: 'Hello please accept my request…', isSender: false, timestamp: '8:20 AM', createdAt: '2026-10-09T08:20:00.000Z'}],
  },
  {
    id: 'noah',
    name: 'Noah Brooks',
    image: portrait('photo-1507003211169-0a1dd7228f2d'),
    lastMessage: 'Hello please accept my request…',
    time: '8:05 AM',
    outgoingStatus: null,
    unreadCount: 0,
    request: true,
    messages: [{id: 'n1', text: 'Hello please accept my request…', isSender: false, timestamp: '8:05 AM', createdAt: '2026-10-09T08:05:00.000Z'}],
  },
  {
    id: 'miracle',
    name: 'Miracle Vaccaro',
    image: portrait('photo-1531123897727-8f129e1688ce'),
    lastMessage: 'Okay, sounds good',
    time: 'Yesterday',
    outgoingStatus: 'read',
    unreadCount: 0,
    messages: [
      {id: 'm1', text: 'Can you send the cut?', isSender: false, timestamp: '4:02 PM', createdAt: '2026-10-07T16:02:00.000Z'},
      {id: 'm2', text: 'Okay, sounds good', isSender: true, timestamp: '4:10 PM', createdAt: '2026-10-07T16:10:00.000Z'},
    ],
  },
  {
    id: 'madelyn',
    name: 'Madelyn Westervelt',
    image: portrait('photo-1524504388940-b1c1722653e1'),
    lastMessage: 'See you there!',
    time: '10/1/26',
    outgoingStatus: 'sent',
    unreadCount: 0,
    messages: [{id: 'd1', text: 'See you there!', isSender: true, timestamp: '11:20 AM', createdAt: '2026-10-01T11:20:00.000Z'}],
  },
  {
    id: 'gretchen',
    name: 'Gretchen Press',
    image: portrait('photo-1529626455594-4ff0802cfb7e'),
    lastMessage: 'On my way!',
    time: '9/29/26',
    outgoingStatus: null,
    unreadCount: 0,
    messages: [{id: 'g1', text: 'On my way!', isSender: false, timestamp: '8:05 PM', createdAt: '2026-09-29T20:05:00.000Z'}],
  },
  {
    id: 'ingrid',
    name: 'Ingrid Bergman',
    image: portrait('photo-1544005313-94ddf0286df2'),
    lastMessage: 'No problem!',
    time: '9/28/26',
    outgoingStatus: null,
    unreadCount: 0,
    messages: [
      {id: 'i1', text: 'Sorry, running late', isSender: true, timestamp: '6:40 PM', createdAt: '2026-09-28T18:40:00.000Z'},
      {id: 'i2', text: 'No problem!', isSender: false, timestamp: '6:44 PM', createdAt: '2026-09-28T18:44:00.000Z'},
    ],
  },
  {
    id: 'tatiana',
    name: 'Tatiana Bator',
    image: portrait('photo-1438761681033-6461ffad8d80'),
    lastMessage: "I'm running late",
    time: '9/29/26',
    outgoingStatus: null,
    unreadCount: 0,
    messages: [{id: 't1', text: "I'm running late", isSender: false, timestamp: '7:15 PM', createdAt: '2026-09-29T19:15:00.000Z'}],
  },
];

export type ChatGate = 'pending' | 'accepted' | 'removed';

let gates: Record<string, 'accepted' | 'removed'> = {};
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export function useChatGates() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => gates
  );
}

export function chatGate(chat: ChatThread, current: Record<string, 'accepted' | 'removed'>): ChatGate {
  return current[chat.id] ?? (chat.request ? 'pending' : 'accepted');
}

export function acceptChatRequest(id: string) {
  gates = {...gates, [id]: 'accepted'};
  emit();
}

export function removeChat(id: string) {
  gates = {...gates, [id]: 'removed'};
  emit();
}

export function chatById(id: string) {
  return CHATS.find((chat) => chat.id === id);
}

export const CHAT_LANGUAGES = [
  {id: 'id', name: 'Bahasa Indonesia'},
  {id: 'en', name: 'English'},
  {id: 'fr', name: 'Français'},
  {id: 'pt', name: 'Português'},
  {id: 'sq', name: 'Shqip'},
  {id: 'vi', name: 'Tiếng Việt'},
  {id: 'tr', name: 'Türkçe'},
] as const;

let chatLanguages: Record<string, string> = {};
const languageListeners = new Set<() => void>();
const emitLanguages = () => languageListeners.forEach((listener) => listener());

export function useChatLanguage(chatId: string) {
  const current = useSyncExternalStore(
    (listener) => {
      languageListeners.add(listener);
      return () => languageListeners.delete(listener);
    },
    () => chatLanguages
  );
  return current[chatId] ?? 'en';
}

export function setChatLanguage(chatId: string, languageId: string) {
  if ((chatLanguages[chatId] ?? 'en') === languageId) return;
  chatLanguages = {...chatLanguages, [chatId]: languageId};
  emitLanguages();
}

export type ChatMenuState = {
  pinned: boolean;
  archived: boolean;
  muted: boolean;
  /** Starts on. Flipping it does not change anything else. */
  notifications: boolean;
  /** Starts off. Flipping it does not lock the chat. */
  chatLock: boolean;
};

const EMPTY_MENU: ChatMenuState = {pinned: false, archived: false, muted: false, notifications: true, chatLock: false};
let menu: Record<string, ChatMenuState> = {};
const menuListeners = new Set<() => void>();
const emitMenu = () => menuListeners.forEach((listener) => listener());

export function useChatMenu() {
  return useSyncExternalStore(
    (listener) => {
      menuListeners.add(listener);
      return () => menuListeners.delete(listener);
    },
    () => menu
  );
}

export function chatMenu(id: string, current: Record<string, ChatMenuState>) {
  return current[id] ?? EMPTY_MENU;
}

function patchMenu(id: string, patch: Partial<ChatMenuState>) {
  menu = {...menu, [id]: {...(menu[id] ?? EMPTY_MENU), ...patch}};
  emitMenu();
}

export function toggleChatPin(id: string) {
  patchMenu(id, {pinned: !(menu[id]?.pinned ?? false)});
}

export function toggleChatMute(id: string) {
  patchMenu(id, {muted: !(menu[id]?.muted ?? false)});
}

export function archiveChat(id: string) {
  if (menu[id]?.archived) return;
  patchMenu(id, {archived: true});
}

export function setChatMuted(id: string, muted: boolean) {
  if ((menu[id]?.muted ?? false) === muted) return;
  patchMenu(id, {muted});
}

export function setChatNotifications(id: string, notifications: boolean) {
  if ((menu[id]?.notifications ?? true) === notifications) return;
  patchMenu(id, {notifications});
}

export function setChatLock(id: string, chatLock: boolean) {
  if ((menu[id]?.chatLock ?? false) === chatLock) return;
  patchMenu(id, {chatLock});
}

let messageOverrides: Record<string, ChatMessage[]> = {};
const messageListeners = new Set<() => void>();
const emitMessages = () => messageListeners.forEach((listener) => listener());

export function useChatMessages(id: string, seed: ChatMessage[]) {
  const overrides = useSyncExternalStore(
    (listener) => {
      messageListeners.add(listener);
      return () => messageListeners.delete(listener);
    },
    () => messageOverrides
  );
  return overrides[id] ?? seed;
}

export function setChatMessages(id: string, messages: ChatMessage[]) {
  messageOverrides = {...messageOverrides, [id]: messages};
  emitMessages();
}

export function clearChatMessages(id: string) {
  setChatMessages(id, []);
}

