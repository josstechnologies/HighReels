export type FavouriteSong = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
};

export type SongPlaylist = {
  id: string;
  title: string;
  visibility: string;
  covers: [string, string, string, string];
  moreCount: number;
};

export const FAVOURITE_SONGS: FavouriteSong[] = [
  {
    id: 'song-1',
    title: 'Fearless-2008',
    artist: 'Taylor Swift',
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  },
  {
    id: 'song-2',
    title: 'The Love',
    artist: 'Adele',
    artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
  },
  {
    id: 'song-3',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
  },
  {
    id: 'song-4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    artwork: 'https://images.unsplash.com/photo-1459749411175-04bf52967778?w=400&q=80',
  },
];

export const SONG_PLAYLISTS: SongPlaylist[] = [
  {
    id: 'pl-1',
    title: 'Chill Vibes',
    visibility: 'Only Me',
    covers: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80',
      'https://images.unsplash.com/photo-1487180144351-b8472daed4ef?w=200&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80',
    ],
    moreCount: 10,
  },
  {
    id: 'pl-2',
    title: 'Road Trip Mix',
    visibility: 'Public',
    covers: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf52967778?w=200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&q=80',
      'https://images.unsplash.com/photo-1498038432885-c6f8640e1e85?w=200&q=80',
    ],
    moreCount: 10,
  },
  {
    id: 'pl-3',
    title: 'Daily Mood',
    visibility: 'Followers Only',
    covers: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80',
      'https://images.unsplash.com/photo-1514320291840-3095421a7625?w=200&q=80',
      'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80',
      'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=200&q=80',
    ],
    moreCount: 10,
  },
  {
    id: 'pl-4',
    title: 'Workout Beats',
    visibility: 'Followers Only',
    covers: [
      'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&q=80',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&q=80',
      'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=200&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&q=80',
    ],
    moreCount: 8,
  },
];
