export type RemovedVideo = {
  id: string;
  title: string;
  postedOn: string;
  views: string;
  thumbnail: string;
  reasonIntro: string;
  reasons: string[];
};

export const VIDEO_REMOVED_INTRO =
  "Your video has been removed because it didn't follow our content guidelines.";

export const REMOVED_VIDEOS: RemovedVideo[] = [
  {
    id: 'removed-1',
    title: 'Prank Gone Wrong',
    postedOn: '10 Feb 2026',
    views: '5.4K',
    thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80',
    reasonIntro: 'This video was removed due to:',
    reasons: ['Content that violates community guidelines', 'Harmful, misleading, or inappropriate material'],
  },
  {
    id: 'removed-2',
    title: 'Street Challenge',
    postedOn: '8 Feb 2026',
    views: '12.1K',
    thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
    reasonIntro: 'This video was removed due to:',
    reasons: ['Violent or graphic content', 'Hate speech or harassment'],
  },
  {
    id: 'removed-3',
    title: 'Night Market Haul',
    postedOn: '5 Feb 2026',
    views: '3.2K',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80',
    reasonIntro: 'This video was removed due to:',
    reasons: ['Spam and deceptive practices', 'Copyright infringement', 'Harmful, misleading, or inappropriate material'],
  },
  {
    id: 'removed-4',
    title: 'Studio Session Cut',
    postedOn: '2 Feb 2026',
    views: '890',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    reasonIntro: 'This video was removed due to:',
    reasons: ['Content that violates community guidelines'],
  },
  {
    id: 'removed-5',
    title: 'Weekend Road Trip',
    postedOn: '28 Jan 2026',
    views: '7.8K',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    reasonIntro: 'This video was removed due to:',
    reasons: [
      'Content that violates community guidelines',
      'Harmful, misleading, or inappropriate material',
      'Violent or graphic content',
      'Hate speech or harassment',
    ],
  },
];

/** @deprecated use REMOVED_VIDEOS[0] */
export const REMOVED_VIDEO = REMOVED_VIDEOS[0];
