import {useSyncExternalStore} from 'react';
import {STATIC_EMOJIS, type StaticEmoji} from '@/mock-data/home-feed';

type Position = {x: number; y: number};

export type AnimatedEmoji = StaticEmoji & {url: string; previewUrl: string};

type UIState = {
  reactionOverlay: {isVisible: boolean; position: Position; postId: string | null};
  showReactionOverlay: (position: Position, postId: string) => void;
  hideReactionOverlay: () => void;
  selectedReaction: string | null;
  setSelectedReaction: (emoji: string | null) => void;
  postReactions: Record<string, string | null>;
  setPostReaction: (postId: string, emoji: string | null) => void;
  emojis: AnimatedEmoji[];
  previewEmojis: AnimatedEmoji[];
  updatePreviewEmoji: (index: number, emoji: AnimatedEmoji) => void;
  songCardVisible: boolean;
  songCardData: any;
  showSongCard: (data: any) => void;
  hideSongCard: () => void;
  profileCardVisible: boolean;
  profileCardData: any;
  showProfileCard: (data: any) => void;
  hideProfileCard: () => void;
  shareSheetVisible: boolean;
  shareSheetData: any;
  showShareSheet: (data: any) => void;
  hideShareSheet: () => void;
  reportSheetVisible: boolean;
  reportSheetData: any;
  showReportSheet: (data?: any) => void;
  hideReportSheet: () => void;
};

const toEmoji = (emoji: StaticEmoji): AnimatedEmoji => ({...emoji, url: '', previewUrl: ''});

const catalog = STATIC_EMOJIS.map(toEmoji);

let state: UIState;

const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

const patch = (partial: Partial<UIState>) => {
  state = {...state, ...partial};
  emit();
};

const closeHomeSheets = {
  songCardVisible: false,
  songCardData: null,
  profileCardVisible: false,
  profileCardData: null,
  shareSheetVisible: false,
  shareSheetData: null,
  reportSheetVisible: false,
  reportSheetData: null,
} as const;

state = {
  reactionOverlay: {isVisible: false, position: {x: 0, y: 0}, postId: null},
  showReactionOverlay: (position, postId) => patch({reactionOverlay: {isVisible: true, position, postId}}),
  hideReactionOverlay: () => patch({reactionOverlay: {...state.reactionOverlay, isVisible: false}}),
  selectedReaction: null,
  setSelectedReaction: (emoji) => patch({selectedReaction: emoji}),
  postReactions: {},
  setPostReaction: (postId, emoji) => patch({postReactions: {...state.postReactions, [postId]: emoji}}),
  emojis: catalog,
  previewEmojis: catalog.slice(0, 6),
  updatePreviewEmoji: (index, emoji) => {
    const previewEmojis = [...state.previewEmojis];
    previewEmojis[index] = emoji;
    patch({previewEmojis});
  },
  songCardVisible: false,
  songCardData: null,
  showSongCard: (data) => patch({...closeHomeSheets, songCardVisible: true, songCardData: data}),
  hideSongCard: () => patch({songCardVisible: false, songCardData: null}),
  profileCardVisible: false,
  profileCardData: null,
  showProfileCard: (data) => patch({...closeHomeSheets, profileCardVisible: true, profileCardData: data}),
  hideProfileCard: () => patch({profileCardVisible: false, profileCardData: null}),
  shareSheetVisible: false,
  shareSheetData: null,
  showShareSheet: (data) => patch({...closeHomeSheets, shareSheetVisible: true, shareSheetData: data}),
  hideShareSheet: () => patch({shareSheetVisible: false, shareSheetData: null}),
  reportSheetVisible: false,
  reportSheetData: null,
  showReportSheet: (data) =>
    patch({
      ...closeHomeSheets,
      reportSheetVisible: true,
      reportSheetData: data ?? state.shareSheetData,
    }),
  hideReportSheet: () => patch({reportSheetVisible: false, reportSheetData: null}),
};

export const useUIStore = <T,>(selector: (value: UIState) => T): T =>
  useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => selector(state),
  );
