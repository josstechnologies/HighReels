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
    bio: "Hey everyone! I'm thrilled to be back and ready to share more exciting updates with you all. It's been a while, but I've missed connecting with this amazing community.",
    follower: 1280,
    follow: 310,
  },
  'user-leo': {
    id: 'user-leo',
    name: 'Leo Park',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    bio: "City nights and neon lights. Stay tuned for more drives, edits, and behind-the-scenes clips from the road.",
    follower: 860,
    follow: 140,
  },
};

export type StaticCommentReply = {
  id: string;
  name: string;
  text: string;
  time: string;
  likes: number;
  image: string;
};

export type StaticComment = {
  id: string;
  postId: string;
  name: string;
  text: string;
  time: string;
  likes: number;
  image: string;
  replies: StaticCommentReply[];
};

export const STATIC_COMMENTS: StaticComment[] = [
  {
    id: 'c1',
    postId: 'static-photo',
    name: 'Victoria Hamilton',
    text: 'Bro that bridge is still the heavyweight champion',
    time: '3h',
    likes: 400,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    replies: [
      {
        id: 'c1r1',
        name: 'Maya Chen',
        text: 'Facts. Nothing beats that skyline.',
        time: '2h',
        likes: 12,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      },
      {
        id: 'c1r2',
        name: 'Jordan Lee',
        text: 'Been trying to recreate this angle for months',
        time: '1h',
        likes: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      },
    ],
  },
  {
    id: 'c2',
    postId: 'static-photo',
    name: 'Ronald Richards',
    text: "Hey... dont need to worry",
    time: '3h',
    likes: 400,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    replies: [],
  },
  {
    id: 'c3',
    postId: 'static-photo',
    name: 'Leslie Alexandra',
    text: "Can't park there mate.",
    time: '3h',
    likes: 400,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
    replies: [
      {
        id: 'c3r1',
        name: 'Sam Ortiz',
        text: 'Haha classic',
        time: '2h',
        likes: 8,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
      },
      {
        id: 'c3r2',
        name: 'Priya Nair',
        text: 'Too real',
        time: '1h',
        likes: 3,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
      },
    ],
  },
  {
    id: 'c4',
    postId: 'static-photo',
    name: 'Leslie Alexandra',
    text: "Can't park there mate.",
    time: '3h',
    likes: 400,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=120&h=120&q=80',
    replies: [],
  },
  {
    id: 'c5',
    postId: 'static-video',
    name: 'Iris',
    text: 'Play this again.',
    time: '5h',
    likes: 2,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab68c7c45e?auto=format&fit=crop&w=120&h=120&q=80',
    replies: [
      {
        id: 'c5r1',
        name: 'Leo Park',
        text: 'On loop already',
        time: '4h',
        likes: 1,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      },
    ],
  },
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
    comments_count: 4,
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
