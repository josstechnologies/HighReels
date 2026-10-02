export type SavedFilter = 'liked' | 'watched' | 'shared';

export type SavedCollection = {
  id: string;
  username: string;
  privacy: string;
  image: string;
};

export type SavedPost = {
  id: string;
  caption: string;
  reactions: string;
  count: string;
  image: string;
  filter: SavedFilter;
};

export const SAVED_COLLECTIONS: SavedCollection[] = [
  {
    id: 'col-1',
    username: '@isabella_diaz',
    privacy: 'Only Me',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
  {
    id: 'col-2',
    username: '@rodrigo_mendes',
    privacy: 'Only Me',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80',
  },
  {
    id: 'col-3',
    username: '@maya_chen',
    privacy: 'Only Me',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80',
  },
  {
    id: 'col-4',
    username: '@alex_turner',
    privacy: 'Only Me',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
  },
  {
    id: 'col-5',
    username: '@sofia_lane',
    privacy: 'Friends',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    id: 'col-6',
    username: '@noah_brooks',
    privacy: 'Only Me',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80',
  },
];

export const SAVED_POSTS: SavedPost[] = [
  {
    id: 'post-1',
    caption: '"Exploring the beaches today 🏄‍♂️✨ #SummerVibes"',
    reactions: '😍🎉👏',
    count: '14.k',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-2',
    caption: '"Enjoying the sunset at Azure Bay... #CoastalLife"',
    reactions: '😍🎉👏',
    count: '14.k',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-5',
    caption: '"Morning coffee and calm vibes ☕ #SlowLiving"',
    reactions: '☕💛',
    count: '8.4k',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-6',
    caption: '"City lights after dark 🌃 #NightWalk"',
    reactions: '🔥✨',
    count: '11.k',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-7',
    caption: '"Trail day in the mountains 🏔️ #HikeLife"',
    reactions: '🥾🌲👏',
    count: '7.1k',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-8',
    caption: '"Fresh blooms from the weekend market 🌸"',
    reactions: '🌸💕',
    count: '5.6k',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-9',
    caption: '"Golden hour skate session 🛹 #Skate"',
    reactions: '😎🔥',
    count: '9.8k',
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c416028?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-10',
    caption: '"Brunch spots I keep coming back to 🥞"',
    reactions: '🥞👏😍',
    count: '12.k',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80',
    filter: 'liked',
  },
  {
    id: 'post-3',
    caption: '"Waves and golden hour 🌊 #OceanViews"',
    reactions: '🔥👏',
    count: '9.2k',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80',
    filter: 'watched',
  },
  {
    id: 'post-11',
    caption: '"Travel recap: Tokyo nights 🇯🇵 #TravelDiary"',
    reactions: '✈️🌃',
    count: '15.k',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    filter: 'watched',
  },
  {
    id: 'post-12',
    caption: '"Studio session — new track soon 🎧"',
    reactions: '🎵🔥',
    count: '6.7k',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
    filter: 'watched',
  },
  {
    id: 'post-13',
    caption: '"Cooking night: handmade pasta 🍝"',
    reactions: '😋👏',
    count: '4.3k',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    filter: 'watched',
  },
  {
    id: 'post-14',
    caption: '"Desert road trip highlights 🌵🚗"',
    reactions: '🏜️🔥',
    count: '10.k',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80',
    filter: 'watched',
  },
  {
    id: 'post-15',
    caption: '"Rainy day playlist ☔ #LoFi"',
    reactions: '🌧️💛',
    count: '3.9k',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&q=80',
    filter: 'watched',
  },
  {
    id: 'post-4',
    caption: '"Shared this coastal escape with friends ✨"',
    reactions: '❤️🙌',
    count: '6.1k',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80',
    filter: 'shared',
  },
  {
    id: 'post-16',
    caption: '"Passed along this recipe — too good not to 🍲"',
    reactions: '🍲❤️',
    count: '2.8k',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    filter: 'shared',
  },
  {
    id: 'post-17',
    caption: '"Weekend market finds worth sharing 🛍️"',
    reactions: '🛍️✨',
    count: '5.2k',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    filter: 'shared',
  },
  {
    id: 'post-18',
    caption: '"Dog park chaos (in the best way) 🐶"',
    reactions: '🐶😂👏',
    count: '18.k',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    filter: 'shared',
  },
  {
    id: 'post-19',
    caption: '"Art walk downtown — favorites from today 🎨"',
    reactions: '🎨💜',
    count: '4.7k',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80',
    filter: 'shared',
  },
  {
    id: 'post-20',
    caption: '"Camping under the stars ⛺✨ #Outdoors"',
    reactions: '⛺🌟',
    count: '8.9k',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
    filter: 'shared',
  },
];
