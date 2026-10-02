export type CommentPermissionPost = {
  id: string;
  caption: string;
  thumbnail: string;
  date: string;
};

export const COMMENT_PERMISSION_POSTS: CommentPermissionPost[] = [
  {
    id: 'new-lens',
    caption: 'Just got my new lens! #astrophotography',
    thumbnail: 'https://picsum.photos/id/250/160/200',
    date: 'Nov 12',
  },
  {
    id: 'sunrise-hike',
    caption: 'Sunrise hike at Mount Serenity. #adventure',
    thumbnail: 'https://picsum.photos/id/1018/160/200',
    date: 'Nov 12',
  },
  {
    id: 'debugging-view',
    caption: 'Debugging with a view. #softwareengineer',
    thumbnail: 'https://picsum.photos/id/0/160/200',
    date: 'Nov 12',
  },
  {
    id: 'salty-hair',
    caption: "Salty hair, don't care. #paradise",
    thumbnail: 'https://picsum.photos/id/64/160/200',
    date: 'Nov 12',
  },
];
