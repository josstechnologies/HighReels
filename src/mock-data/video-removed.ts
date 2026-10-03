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

export const REMOVED_VIDEO: RemovedVideo = {
  id: 'removed-1',
  title: 'Prank Gone Wrong',
  postedOn: '10 Feb 2026',
  views: '5.4K',
  thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80',
  reasonIntro: 'This video was removed due to:',
  reasons: ['Content that violates community guidelines', 'Harmful, misleading, or inappropriate material'],
};
