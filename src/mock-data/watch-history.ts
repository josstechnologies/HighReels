export type WatchHistoryItem = {
  id: string;
  thumbnail: string;
  views: string;
};

export type WatchHistorySection = {
  title: string;
  data: WatchHistoryItem[];
};

export const WATCH_HISTORY: WatchHistorySection[] = [
  {
    title: 'Today',
    data: [
      {id: 'today-1', thumbnail: 'https://picsum.photos/id/219/300/400', views: '2.1M'},
      {id: 'today-2', thumbnail: 'https://picsum.photos/id/164/300/400', views: '3.5M'},
      {id: 'today-3', thumbnail: 'https://picsum.photos/id/64/300/400', views: '1.7M'},
      {id: 'today-4', thumbnail: 'https://picsum.photos/id/28/300/400', views: '5.2M'},
      {id: 'today-5', thumbnail: 'https://picsum.photos/id/29/300/400', views: '6.8M'},
      {id: 'today-6', thumbnail: 'https://picsum.photos/id/122/300/400', views: '2.2M'},
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {id: 'yesterday-1', thumbnail: 'https://picsum.photos/id/1016/300/400', views: '4.1M'},
      {id: 'yesterday-2', thumbnail: 'https://picsum.photos/id/292/300/400', views: '2.8M'},
      {id: 'yesterday-3', thumbnail: 'https://picsum.photos/id/1005/300/400', views: '3.3M'},
    ],
  },
  {
    title: '12 July, 2026',
    data: [
      {id: 'july-1', thumbnail: 'https://picsum.photos/id/1015/300/400', views: '1.4M'},
      {id: 'july-2', thumbnail: 'https://picsum.photos/id/1018/300/400', views: '8.2M'},
      {id: 'july-3', thumbnail: 'https://picsum.photos/id/1036/300/400', views: '2.9M'},
      {id: 'july-4', thumbnail: 'https://picsum.photos/id/1040/300/400', views: '3.1M'},
      {id: 'july-5', thumbnail: 'https://picsum.photos/id/1043/300/400', views: '5.6M'},
      {id: 'july-6', thumbnail: 'https://picsum.photos/id/1050/300/400', views: '1.9M'},
    ],
  },
];
