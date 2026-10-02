export type DownloadDataTab = 'request' | 'download';

export type DownloadDataCategory = {
  id: string;
  label: string;
  description?: string;
};

export type ReadyDownload = {
  id: string;
  title: string;
  readyAt: string;
  size: string;
};

/** Categories from Figma — Request Data tab. */
export const DOWNLOAD_DATA_CATEGORIES: DownloadDataCategory[] = [
  {id: 'comments', label: 'Comments'},
  {id: 'posts', label: 'Posts'},
  {id: 'direct-messages', label: 'Direct messages'},
  {id: 'likes-favourites', label: 'Likes and Favourites'},
  {
    id: 'your-activity',
    label: 'Your Activity',
    description: 'Includes your watch and search history, ad interests and off-highreels activity and others.',
  },
  {id: 'profile-settings', label: 'Profile and settings'},
  {id: 'location-reviews', label: 'Location Reviews'},
  {id: 'income-wallets', label: 'Income + wallets'},
];

/** Empty by default so Download Data tab shows empty state. */
export const READY_DOWNLOADS: ReadyDownload[] = [];
