export type RecentlyDeletedItem = {
  id: string;
  username: string;
  meta: string;
  caption: string;
  thumbnail: string;
};

export type RecentlyDeletedSection = {
  id: string;
  title: string;
  data: RecentlyDeletedItem[];
};

export const RECENTLY_DELETED_SECTIONS: RecentlyDeletedSection[] = [
  {
    id: 'today',
    title: 'Today',
    data: [
      {
        id: 'del-1',
        username: '@Katty_1',
        meta: 'Deleted today · 25 days left',
        caption: 'Exploring the beaches today 🌊✨ #SummerVibes',
        thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80',
      },
      {
        id: 'del-2',
        username: '@Katty_1',
        meta: 'Deleted today · 25 days left',
        caption: 'Exploring the beaches today 🌊✨ #SummerVibes',
        thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&q=80',
      },
    ],
  },
  {
    id: 'yesterday',
    title: 'Yesterday',
    data: [
      {
        id: 'del-3',
        username: '@Katty_1',
        meta: 'Deleted yesterday · 24 days left',
        caption: 'Exploring the beaches today 🌊✨ #SummerVibes',
        thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&q=80',
      },
      {
        id: 'del-4',
        username: '@Katty_1',
        meta: 'Deleted yesterday · 24 days left',
        caption: 'Exploring the beaches today 🌊✨ #SummerVibes',
        thumbnail: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=200&q=80',
      },
    ],
  },
  {
    id: '28-sep',
    title: '28 September',
    data: [
      {
        id: 'del-5',
        username: '@Katty_1',
        meta: 'Deleted 4 days ago · 21 days left',
        caption: 'Morning coffee run ☕ #DailyVibes',
        thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80',
      },
      {
        id: 'del-6',
        username: '@Katty_1',
        meta: 'Deleted 4 days ago · 21 days left',
        caption: 'City lights after dark 🌃✨',
        thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=200&q=80',
      },
    ],
  },
  {
    id: '25-sep',
    title: '25 September',
    data: [
      {
        id: 'del-7',
        username: '@Katty_1',
        meta: 'Deleted 7 days ago · 18 days left',
        caption: 'Weekend hike with friends 🥾🌲 #Outdoors',
        thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e5ec?w=200&q=80',
      },
    ],
  },
  {
    id: '20-sep',
    title: '20 September',
    data: [
      {
        id: 'del-8',
        username: '@Katty_1',
        meta: 'Deleted 12 days ago · 13 days left',
        caption: 'Sunset session by the pier 🌅',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80',
      },
      {
        id: 'del-9',
        username: '@Katty_1',
        meta: 'Deleted 12 days ago · 13 days left',
        caption: 'Trying a new recipe tonight 🍝 #Foodie',
        thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80',
      },
      {
        id: 'del-10',
        username: '@Katty_1',
        meta: 'Deleted 12 days ago · 13 days left',
        caption: 'Studio day — new track dropping soon 🎧',
        thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&q=80',
      },
    ],
  },
];
