export const STATIC_EMOJIS = [
  {id: '1', glyph: '❤️'},
  {id: '2', glyph: '😂'},
  {id: '3', glyph: '🔥'},
  {id: '4', glyph: '👏'},
  {id: '5', glyph: '😍'},
  {id: '6', glyph: '😮'},
  {id: '7', glyph: '💯'},
  {id: '8', glyph: '🎉'},
  {id: '9', glyph: '😢'},
  {id: '10', glyph: '🙏'},
  {id: '11', glyph: '😎'},
  {id: '12', glyph: '🤯'},
  {id: '13', glyph: '💖'},
  {id: '14', glyph: '🙌'},
  {id: '15', glyph: '✨'},
] as const;

export type StaticEmoji = {id: string; glyph: string};

export const STATIC_PROFILES = {
  'user-ava': {
    id: 'user-ava',
    name: 'Ava Cole',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    bio: 'Sunsets and trail runs.',
    follower: 1280,
    follow: 310,
  },
  'user-leo': {
    id: 'user-leo',
    name: 'Leo Park',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    bio: 'City nights.',
    follower: 860,
    follow: 140,
  },
};

export const STATIC_COMMENTS = [
  {id: 'c1', postId: 'static-photo', name: 'Maya', text: 'This view is unreal.', likes: 3},
  {id: 'c2', postId: 'static-photo', name: 'Noah', text: 'Where was this shot?', likes: 1},
  {id: 'c3', postId: 'static-video', name: 'Iris', text: 'Play this again.', likes: 2},
];

export const STATIC_FEED = [
  {
    id: 'static-photo',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=720&h=1280&q=80',
    overlays: [
      {
        id: 'overlay-caption',
        type: 'text',
        content: 'HighReels',
        x: 24,
        y: 96,
        color: '#ffffff',
        font: 'NunitoSans_700Bold',
      },
    ],
    my_reaction: {has_reacted: false, emoji_id: null},
    reactions_count: 12,
    comments_count: 2,
    share_count: 3,
    user: {id: 'user-ava', name: 'Ava Cole', image: STATIC_PROFILES['user-ava'].image, user_name: 'ava'},
    templates: {name: 'Golden Hour', category: 'Travel'},
    profiles: {name: 'Ava Cole'},
  },
  {
    id: 'static-video',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    overlays: [],
    my_reaction: {has_reacted: false, emoji_id: null},
    reactions_count: 4,
    comments_count: 1,
    share_count: 1,
    user: {id: 'user-leo', name: 'Leo Park', image: STATIC_PROFILES['user-leo'].image, user_name: 'leo'},
    templates: {name: 'Night Drive', category: 'City'},
    profiles: {name: 'Leo Park'},
  },
  {
    id: 'static-text',
    type: 'text',
    text: 'Static text reel',
    overlays: [{id: 'overlay-bg', type: 'text', content: '', x: 0, y: 0, color: '#1a1033', font: 'NunitoSans_700Bold'}],
    my_reaction: {has_reacted: false, emoji_id: null},
    reactions_count: 0,
    comments_count: 0,
    share_count: 0,
    user: {id: 'user-ava', name: 'Ava Cole', image: STATIC_PROFILES['user-ava'].image, user_name: 'ava'},
    templates: {name: 'Original Sound', category: 'Notes'},
    profiles: {name: 'Ava Cole'},
  },
];
